import { createContext, useContext, useEffect, useReducer } from "react";
import { IpReducer, IpState } from "./IpReducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import AuthContext from "./AuthContext";


type IpContextProps ={
  ip: String | null,
  status: 'checkingIp' | 'isIp' | 'notIp';
  saveIp: (ip: String) => void
}

const IpContext = createContext({} as IpContextProps);

const IpInitialState: IpState = {
  ip: null,
  status: 'checkingIp',
};

export const IpProvider = ({children}: any) =>{
  const [state, dispatch] = useReducer(IpReducer, IpInitialState);
  useEffect(()=>{
    checkIp();
  },[]);
  const checkIp = () =>{
    AsyncStorage.getItem('ip').then(ip =>{
      if (!ip) {
        dispatch({ type: 'statusNotIP' });
      } else {
        dispatch({ type: 'statusIsIp', payload: ip });
      }
    }).catch(e=>{
      return dispatch({ type: 'statusNotIP' });
    });
  };
  const saveIp = async (ip:String) =>{
    await AsyncStorage.setItem('ip', ip.toString());
    Alert.alert('Registro Exitoso','Se ha registrado la dirección del servidor exitosamente');
    dispatch({type:'statusIsIp', payload: ip});
  };
  return (
    <IpContext.Provider value={{
      ...state,
      saveIp,
    }}>
      {children}
    </IpContext.Provider>
  );
};


export default IpContext;
