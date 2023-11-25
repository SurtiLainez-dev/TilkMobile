import { Colaborador, DataAuth, LoginData, User } from "../interfaces/UserInterface";
import { createContext, useEffect, useReducer } from "react";
import { AuthReducer, AuthState } from "./AuthReducer";
import { tilkApi } from "../api/tilkApi";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextProps = {
  token: String | null;
  user: User | null;
  statusAuth: 'checking' | 'authenticated' | 'not-authenticated';
  colaborador: Colaborador | null;
  signIn: (data: LoginData) => void;
  logOut: () => void;
  loading: Boolean,
  changeLoading: (val: Boolean) => void;
  drawer: Boolean,
  setDrawer: (val: Boolean) => void;
}

const AuthContext = createContext( {} as AuthContextProps);

const AuthInitialState: AuthState = {
  statusAuth: 'not-authenticated',
  token: null,
  user: null,
  colaborador: null,
  loading:     false,
  drawer:      true,
};

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(AuthReducer, AuthInitialState);

  useEffect(()=>{
    checkToken().then(()=>{

    });
  },[])
  const signIn = async ({email, password}: LoginData) => {
    dispatch({type: 'changeLoading', payload: true});

    try {
      let res = await tilkApi.post<DataAuth>('/login',{email,password});
      await AsyncStorage.setItem('token', res.data.success.token);
      await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
      await AsyncStorage.setItem('colaborador', JSON.stringify(res.data.user.colaborador));
      dispatch({type:'login',payload:{
          token: res.data.success.token,
          user: res.data.user,
          colaborador: res.data.user.colaborador,
        }});
      dispatch({type:'changeLoading', payload:false});
    } catch (error){
      let msg = '';
      try {
        // @ts-ignore
        if (error.response.status === 500){
          msg = 'Hubo un error en el servidor. [error status:500]';
        }
        // @ts-ignore
        if (error.response.status === 401){
          // @ts-ignore
          msg = error.response.data;
        }
        // @ts-ignore
        if (error.response.status === 422){
          // @ts-ignore
          msg = error.response.data;
        }
      } catch (e) {
        msg = 'Tiempo de espera agotado, el servidor tardo mucho en responder.';
      }
      dispatch({type: 'changeLoading', payload: false});
      Alert.alert('Datos Incorrectos', msg);
    }
  };
  const logOut = async () => {
    dispatch({type:'changeLoading', payload: true});
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('colaborador')
    await AsyncStorage.removeItem('user')
    dispatch({type:'logOut'});
    dispatch({type:'changeLoading', payload: false});
  };
  const checkToken = async () =>{
    try {
      let token = await  AsyncStorage.getItem('token');
      if (token){
        // @ts-ignore
        let colaborador:(Colaborador | null) = await AsyncStorage.getItem('colaborador');
        // @ts-ignore
        let user:(User | null)        = await AsyncStorage.getItem('user');
        if (typeof user === "string" && typeof colaborador === "string") {
          // @ts-ignore
          dispatch({type:'login',payload:{
              token: token,
              user:  JSON.parse(user),
              colaborador: JSON.parse(colaborador),
            }});
        }
      }else{
        dispatch({type:'logOut'})
      }
    } catch (e){

      Alert.alert('Error','Hubo un error al iniciar la app')
    }
  };
  const changeLoading = (val:Boolean) =>{
    dispatch({type: 'changeLoading', payload: val})
  };
  const setDrawer = (val:Boolean) =>{
    dispatch({type:'setDrawer', payload: val});
  }
  return (
    <AuthContext.Provider value={{
      ...state,
      signIn,
      logOut,
      changeLoading,
      setDrawer
    }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthContext;
