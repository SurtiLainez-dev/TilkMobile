import { Colaborador, User } from "../interfaces/UserInterface";

export interface statusAuth{
  statusAuth: 'checking' | 'authenticated' | 'not-authenticated';
}
export interface AuthState{
  token: String | null;
  user: User | null;
  colaborador: Colaborador | null;
  statusAuth: 'checking' | 'authenticated' | 'not-authenticated';
  loading: Boolean,
  drawer: Boolean
}

type AuthAction =
  | {type: 'login',    payload:{token: String, user: User, colaborador: Colaborador}}
  | {type: 'logOut'}
  | {type: 'changeLoading', payload:Boolean}
  | {type: 'setDrawer', payload:Boolean}
  | {type: 'authenticated'}

export const AuthReducer = (state: AuthState, action: AuthAction): AuthState =>{

  switch (action.type){
    case "login":
      return {
        ...          state,
        user:        action.payload.user,
        colaborador: action.payload.colaborador,
        token:       action.payload.token,
        statusAuth:  'authenticated'
      };
    case "logOut":
      return {
        ...          state,
        statusAuth:  'not-authenticated',
        token:       null,
        colaborador: null,
        user:        null,
      };
    case "changeLoading":
      return {
        ...      state,
        loading: action.payload,
      };
    case "authenticated":
      return {
        ...state,
        statusAuth: 'authenticated'
      };
    case "setDrawer":
      return {
        ...state,
        drawer: action.payload
      }
  }
}
