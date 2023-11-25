import { DataCuenta, PagosContrato, VentaAll } from "../../interfaces/Accountsnterface";
import { createContext, useReducer } from "react";
import { VentaReducer, VentaState } from "./VentaReducer";
import tilkApi from "../../api/tilkApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Linking } from "react-native";
import { DataGestiones, DataPortafolio, Gesion, Gestione} from "../../interfaces/PortafolioInterface";
import { Colaborador, DataColaboradores2, User } from "../../interfaces/UserInterface";

type VentaContextProps = {
  venta: VentaAll | null,
  statusVenta: Boolean,
  getVenta: (id: Number) => void,
  removeVenta: () => void,
  loadRecibo: Boolean,
  tokenDocumento: String,
  solicitarClave: (codigo: String, tipo: Number|String|null) => void;
  setPortafolioId: (id:Number) => void;
  portafolioId: Number,
  loadPortafolio: Boolean,
  portafolio: DataPortafolio | null,
  getPortafolio: () => void,
  gestiones: DataGestiones | null,
  gestionesHoy: Gestione[] | [],
  gestion: Gestione | null,
  setGestion: (data:Gestione) => void,
  pagosAtrasados: PagosContrato[] | [],
  removePagosAtrasados: () => void,
  colaboradores: Colaborador[] | [],

  cargarColaboradores: () => void,
  removeGestion: () => void,
  datosGestion: Gesion | null
  setDatosGestion: (data:Gesion) => void,
  removeDatosGestion: () => void,
  tipoBack: 'goCuentas' | 'goCaja',
  setTipoBack: (tipo: ('goCuentas' | 'goCaja')) => void,
  getDocumento: (token:String, tipo: Number|null|String, codigo: String) => void
}

const VentaContext = createContext({} as VentaContextProps);

const VentaInitialState: VentaState = {
  statusVenta: false,
  venta: null,
  loadRecibo: false,
  tokenDocumento: '',
  portafolioId: 0,
  loadPortafolio: false,
  portafolio: null,
  gestiones: null,
  gestionesHoy: [],
  gestion: null,
  pagosAtrasados: [],
  colaboradores: [],
  datosGestion: null,
  tipoBack: 'goCuentas',
};

export const VentaProvider = ( {children}: any) => {
  const [state,dispatch] = useReducer(VentaReducer, VentaInitialState);

  const setTipoBack = (tipo: ('goCuentas' | 'goCaja')) =>{
    dispatch({type:'setTipoBack', payload: tipo})
  }
  const setDatosGestion = (data: Gesion) =>{
    dispatch({type:'setDatosGestion', payload: data});
  };
  const removeDatosGestion = () =>{
    dispatch({type:'removeDatosGestion'});
  }
  const cargarColaboradores = () =>{
    tilkApi.get<DataColaboradores2>('colaboradores_2').then(res=>{
      dispatch({type:'setColaboradores', payload: res.data.colaboradores});
    });
  };
  const removeGestion = () =>{
    dispatch({type:'removeGestion'});
    dispatch({type:'removePagosAtrasado'});
  };
  const getVenta = async (id:Number) => {
    dispatch({type:'setStatus', payload: true});
    let res = await tilkApi.get<DataCuenta>('/cuentas/ventas/'+id);
    dispatch({type:'setVenta', payload: res.data.venta});
  };
  const removeVenta = () =>{
    dispatch({type:'removeVenta'})
  };
  const solicitarClave = async (codigo:String, tipo:Number|null|String) =>{
    dispatch({type:'setStatusToken', payload: true});
    let token = await tilkApi.post('solicitar_clave_doucmento');
    dispatch({type:'setToken', payload: token.data.clave});
    getDocumento(token.data.clave, tipo, codigo).then();
  };
  const getDocumento = async (token:String, tipo: Number|null|String, codigo: String) =>{
    let user:string | null | User = await AsyncStorage.getItem('user')
    if (typeof user === "string") {
      user = JSON.parse(user);
    }
    let url = '';
    if(!tipo || tipo == 1)
      url = tilkApi.defaults.baseURL + '/documentos/cajas/recibos/usuario=' + user?.usuario + '/recibo=' + codigo + '/' + token;
    else if(tipo == 2)
      url = tilkApi.defaults.baseURL + '/documentos/cajas/recibo_dxc/usuario=' + user?.usuario + '/recibo=' + codigo + '/' + token;

    console.log(url)
    await Linking.openURL(url.toString());
    dispatch({type:'setStatusToken', payload: false});
  }
  const setPortafolioId = async (id: Number) =>{
    await dispatch({type:'setPortafolioId', payload: id});
  }
  const getPortafolio = async () =>{
    try {
      dispatch({type:'setLoadPortafolio', payload: true});
      let portafolio = tilkApi.get<DataPortafolio>('/cobros/portafolio/'+state.portafolioId);
      let gestiones  = tilkApi.get<DataGestiones>('/cobros/portafolio/'+state.portafolioId+'/gestiones');
      let res = await Promise.all([portafolio, gestiones]);

      let fecha1 = new Date();
      let fecha2 =  new Date();
      let gestionesHoy: Gestione[] | [] = res[1].data.gestiones.filter(item=>{
        if (item.proxima_gestion){
          fecha2 = new Date(item.proxima_gestion);
          if (fecha2.getTime() < fecha1.getTime() && item.dias_mora > 0){
            return item;
          }
        }
      });
      dispatch({type:'setPortafolio', payload: {
          portafolio: res[0].data,
          gestiones:  res[1].data,
          gestionesHoy: gestionesHoy
        }});
    } catch (e){
      dispatch({type:'setLoadPortafolio', payload: false});
      Alert.alert('Error al Cargar', 'Hubo un error al cargar las gestiones');
    }
  };

  const setGestion = (data: Gestione) =>{
    dispatch({type:'setLoadPortafolio', payload: true});
    dispatch({type:'setStatus', payload: true});
    tilkApi.get<DataCuenta>('/cuentas/ventas/'+data.id).then(res=>{
      dispatch({type:'setVenta', payload: res.data.venta});
      let pagos:PagosContrato[] = res.data.venta.pagos_contratos.filter(item=>item.estado === 2);
      dispatch({type:'setGestion', payload: {gestion: data, pagos}});
    });
  }

  const removePagosAtrasados = () =>{
    dispatch({type:'removePagosAtrasado'});
  }

  return (
    <VentaContext.Provider value={{
      ...state,
      getVenta,
      removeVenta,
      solicitarClave,
      setPortafolioId,
      getPortafolio,
      setGestion,
      removePagosAtrasados,
      cargarColaboradores,
      removeGestion,
      setDatosGestion,
      removeDatosGestion,
      setTipoBack,
      getDocumento
    }}>
      {children}
    </VentaContext.Provider>
  )
};

export default VentaContext;
