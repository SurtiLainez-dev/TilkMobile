import { PagosContrato, Venta, VentaAll } from "../../interfaces/Accountsnterface";
import { DataGestiones, DataPortafolio, Gesion, Gestione, Portafolio } from "../../interfaces/PortafolioInterface";
import { Colaborador } from "../../interfaces/UserInterface";

export interface VentaState{
  statusVenta: Boolean,
  venta: VentaAll | null,
  loadRecibo: Boolean,
  tokenDocumento: String,
  portafolioId: Number,
  loadPortafolio: Boolean,
  portafolio: DataPortafolio | null,
  gestiones: DataGestiones | null,
  gestionesHoy: Gestione[] | [],
  gestion: Gestione | null,
  pagosAtrasados: PagosContrato[] | [],
  colaboradores: Colaborador[] | [],
  datosGestion: Gesion | null,
  tipoBack: 'goCuentas' | 'goCaja'
};

type VentaAction =
  | {type:'setStatus', payload: Boolean}
  | {type:'setVenta',  payload: VentaAll}
  | {type:'removeVenta'}
  | {type:'setToken',  payload: String}
  | {type:'setStatusToken', payload: Boolean}
  | {type:'setPortafolioId',  payload: Number}
  | {type:'setPortafolio',  payload: {portafolio: DataPortafolio, gestiones: DataGestiones, gestionesHoy: Gestione[]}  }
  | {type:'setLoadPortafolio',  payload: Boolean}
  | {type:'setGestion',  payload: { gestion: Gestione, pagos: PagosContrato[] }}
  | {type:'removePagosAtrasado'}
  | {type:'setColaboradores',  payload: Colaborador[]}
  | {type:'removeGestion'}
  | {type:'setDatosGestion', payload: Gesion}
  | {type:'removeDatosGestion'}
  | {type:'setTipoBack', payload: ('goCuentas' | 'goCaja')}

export const VentaReducer = (state: VentaState, action: VentaAction ): VentaState =>{
  switch (action.type){
    case "setVenta":
      return {
        ...state,
        venta: action.payload,
        statusVenta: false,
      };
    case "setStatus":
      return {
        ...state,
        statusVenta: action.payload,
      };
    case "removeVenta":
      return {
        ...state,
        venta: null,
      };
    case "setToken":
      return {
        ...state,
        tokenDocumento: action.payload,
      };
    case "setStatusToken":
      return {
        ...state,
        loadRecibo: action.payload,
      };
    case "setPortafolioId":
      return {
        ...state,
        portafolioId: action.payload,
      };
    case 'setPortafolio':
      return {
        ...state,
        portafolio: action.payload.portafolio,
        gestiones:  action.payload.gestiones,
        gestionesHoy: action.payload.gestionesHoy,
        loadPortafolio: false,
      };
    case 'setLoadPortafolio':
      return {
        ...state,
        loadPortafolio: action.payload,
      };
    case "setGestion":
      return {
        ...state,
        gestion: action.payload.gestion,
        loadPortafolio: false,
        pagosAtrasados: action.payload.pagos
      };
    case "removePagosAtrasado":
      return {
        ...state,
        pagosAtrasados: []
      };
    case "setColaboradores":
      return {
        ...state,
        colaboradores: action.payload
      };
    case "removeGestion":
      return {
        ...state,
        gestion: null
      };
    case "setDatosGestion":
      return {
        ...state,
        datosGestion: action.payload
      };
    case "removeDatosGestion":
      return {
        ...state,
        datosGestion: null
      };
    case "setTipoBack":
      return {
        ...state,
        tipoBack: action.payload
      }
  }
};
