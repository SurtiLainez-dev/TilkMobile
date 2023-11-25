import {
  Caja,
  DataCajas,
  DataCajasXSucursal,
  DataTotalesCajas,
  PagosDistribuidosInterface
} from "../interfaces/CajasInterface";
import { createContext, useContext, useEffect, useReducer } from "react";
import { CajasReducer, CajasState } from "./CajasReducer";
import tilkApi from "../api/tilkApi";
import AuthContext from "./AuthContext";
import { PagosContrato } from "../interfaces/Accountsnterface";
import VentaContext from "./tilk/VentaContext";

type CajasContextProps = {
  cajas: Caja[] | null,
  loadCajas: Boolean,
  getCajas: () => void,
  totalIngresos: Number,
  totalEgresos: Number,
  totalTarjeta: Number,
  cajas_x_Sucursales: Caja[] | null,
  getCajas_x_Sucursales: () => void,
  caja: Caja | null,
  setCaja: (data:Caja)=>void,
}
const CajasContext = createContext({} as CajasContextProps);

const CajasInitialState: CajasState = {
  cajas: null,
  loadCajas: false,
  totalTarjeta: 0,
  totalEgresos: 0,
  totalIngresos: 0,
  cajas_x_Sucursales: null,
  caja: null,
};
export const CajasProvider = ({children}:any) =>{
  const [state, dispatch] = useReducer(CajasReducer, CajasInitialState);
  const {user} = useContext(AuthContext);

  const getCajas = async () =>{
    dispatch({type:'setLoadCajas', payload: true});
    let fecha   = new Date();
    let cajas   = tilkApi.get<DataCajas>('/cajas/cajas');
    let totales = tilkApi.get<DataTotalesCajas>('cajas/total_ingresos/'+fecha.getFullYear()+'-'+(fecha.getMonth() + 1)+'-'+fecha.getDate());
    let res     = await Promise.all([cajas, totales]);
    dispatch({type:'setCajas', payload: res[0].data.cajas});
    dispatch({type:'setTotales', payload:{totalInicial:res[1].data.totalI, totalEgreso:res[1].data.totalE, totalTarjeta: res[1].data.totalT}});
    dispatch({type:'setLoadCajas', payload: false});
  };

  const getCajas_x_Sucursales = () =>{
    dispatch({type:'setLoadCajas', payload: true});
    tilkApi.get<DataCajasXSucursal>('/cajas/cajas_x_sucursal/'+user?.colaborador?.sucursal_id).then(res=>{
      dispatch({type:'setCajas_x_Sucursal', payload:res.data.cajas});
      dispatch({type:'setLoadCajas', payload: false});
    });
  };

  const setCaja = (data:Caja) =>{
    dispatch({type:'setCaja', payload: data});
  };

  return (
    <CajasContext.Provider value={{
      ...state,
      getCajas,
      getCajas_x_Sucursales,
      setCaja,
    }}>
      {children}
    </CajasContext.Provider>
  );
};
export default CajasContext;
