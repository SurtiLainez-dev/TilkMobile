import { Caja, PagosDistribuidosInterface } from "../interfaces/CajasInterface";
import { PagosContrato } from "../interfaces/Accountsnterface";

export interface CajasState{
  cajas: Caja[] | null,
  loadCajas: Boolean,
  totalIngresos: Number,
  totalEgresos: Number,
  totalTarjeta: Number,
  cajas_x_Sucursales: Caja[] | null,
  caja: Caja | null,
};

type CajasAction =
  | {type: 'setCajas', payload: Caja[]}
  | {type: 'setLoadCajas', payload: Boolean}
  | {type: 'setTotales', payload: {totalInicial: Number, totalEgreso: Number, totalTarjeta: Number}}
  | {type: 'setCajas_x_Sucursal', payload: Caja[]}
  | {type: 'setCaja', payload: Caja}

export const CajasReducer = (state: CajasState, action: CajasAction):CajasState =>{
  switch (action.type){
    case "setCajas":
      return {
        ...state,
        cajas: action.payload,
      };
    case "setLoadCajas":
      return {
        ...state,
        loadCajas: action.payload,
      };
    case "setTotales":
      return {
        ...state,
        totalIngresos: action.payload.totalInicial,
        totalEgresos:  action.payload.totalEgreso,
        totalTarjeta:  action.payload.totalTarjeta
      };
    case "setCajas_x_Sucursal":
      return {
        ...state,
        cajas_x_Sucursales: action.payload
      };
    case "setCaja":
      return {
        ...state,
        caja: action.payload
      };
  }
};
