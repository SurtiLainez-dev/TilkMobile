export interface IpState{
  ip: String | null;
  status: 'checkingIp' | 'isIp' | 'notIp';
}

type IpAction =
  | {type: 'statusIsIp', payload: String}
  | {type: 'statusNotIP'}
export const IpReducer = (state: IpState, action: IpAction): IpState => {
switch (action.type){
  case 'statusNotIP':
    return {
      ...state,
      status: 'notIp',
    };
  case 'statusIsIp':
    return {
      ...state,
      ip: action.payload,
      status: 'isIp',
    };
}
};

