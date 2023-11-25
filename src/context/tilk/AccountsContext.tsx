import { DataAccount, Venta } from "../../interfaces/Accountsnterface";
import { createContext, useContext, useEffect, useReducer } from "react";
import { AccountReducer, AccountState } from "./AccountsReducer";
import tilkApi from "../../api/tilkApi";
import AuthContext from "../AuthContext";


type AccountContextProps = {
  account: null | Venta
  accounts: null | DataAccount,
  takeAccount: () => void,
  loadAccounts: () => void,
  loadAccount: () => void
}

const AccountContext = createContext({} as AccountContextProps);




export const AccountInitialState: AccountState = {
  account: null,
  accounts: null,
}

export const AccountProvider = ({children}: any) =>{
  const [state, dispatch] = useReducer(AccountReducer, AccountInitialState);
  const { changeLoading}    = useContext(AuthContext);
  useEffect(()=>{
    loadAccounts();
  },[])
  const takeAccount = ()=>{};
  const loadAccounts = () => {
    // changeLoading(true);
    tilkApi.get<DataAccount>('/cuentas/ventas/pendientes').then(res=>{
      dispatch({type: 'takeAccounts', payload: res.data})
      // changeLoading(false);
    }).catch(error=>{
      console.log(error)
      // changeLoading(false);
    })
  };
  const loadAccount = () => {};

  return (
    <AccountContext.Provider value={{
      ...state,
      takeAccount,
      loadAccount,
      loadAccounts
    }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;

