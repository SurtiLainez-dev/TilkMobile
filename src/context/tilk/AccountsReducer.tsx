import { DataAccount, Venta } from "../../interfaces/Accountsnterface";

export interface AccountState{
  account: Venta | null,
  accounts: DataAccount | null
}

type AccountAction =
  | {type: 'takeAccount', payload:Venta}
  | {type: 'takeAccounts', payload: DataAccount}

export const AccountReducer = (state: AccountState, action: AccountAction): AccountState =>{
  switch (action.type) {
    case "takeAccount":
      return {
        ...state,
        account: action.payload,
      };
    case "takeAccounts":
      return {
        ...state,
        accounts: action.payload,
      }
  }
}
