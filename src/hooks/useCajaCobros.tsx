import { useContext, useState } from "react";
import { Alert } from "react-native";
import VentaContext from "../context/tilk/VentaContext";
import { PagosContrato } from "../interfaces/Accountsnterface";
import { PagosDistribuidosInterface } from "../interfaces/CajasInterface";
import tilkApi from "../api/tilkApi";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../context/AuthContext";
import CajasContext from "../context/CajasContext";
interface DataCrearRecibo{
  sucursal_id: Number | undefined,
  total: Number,
  venta_id: Number,
  observacion: String,
  pagos: PagosDistribuidosInterface[] | [],
  caja_id: Number | undefined,
  saldo_actual: Number,
  forma_pago: Number,
  referencia: String,
  ccBanco: Number | null,
  recordatorio: String | null
}
interface DataResCrearRecibo{
  reciboId: Number,
  clave: String,
  codigo: String,
}
export const useCajaCobros = () =>{
  const navegation: any = useNavigation();
  const {setDrawer} = useContext(AuthContext);
  const [pagosDistribuidos, setpagosDistribuidos] = useState<PagosDistribuidosInterface[]>([]);
  const {venta, getDocumento} = useContext(VentaContext);
  const [load, setLoad] = useState(false);
  const distribuirPagos = async (totalAbonado: String | Number) =>{
    let total: Number = 0;
    if (typeof totalAbonado === "string") {
      total = parseFloat(totalAbonado);
    }
    if (total > 0){
      // @ts-ignore
      if (total <= venta?.saldo_actual){
        distribucionPagos(total);
      } else {
        Alert.alert('Error','El total abonado es mayor que el saldo actual');
        setpagosDistribuidos([])
      }
    } else {
      Alert.alert('Error','El total abonado tiene que ser mayor a cero');
      setpagosDistribuidos([])
    }
  };
  const distribucionPagos = (totalAbonado: String | Number) =>{
    // @ts-ignore
    let saldo: Number = totalAbonado;
    let pagosDistribuidos:PagosDistribuidosInterface[] = [];
    // @ts-ignore
    let pagos: PagosContrato[] = venta?.pagos_contratos.filter(item=>item.estado < 3);
    let pago:Number = 0;
    let saldo_p:Number = 0;
    let pagosErrores = venta?.pagos_contratos.filter(item=>(item.saldo_cap < 0 || item.saldo_actual < 0 || item.mora < 0));
    // @ts-ignore
    if (pagosErrores.length === 0){
      pagos.forEach(item=>{
        if (saldo > 0){
          if (item.is_mora === 1 && item.mora > 0) {
            if (saldo > item.mora) {
              pago = item.mora;
              saldo_p = 0;
            } else {
              pago = saldo;
              // @ts-ignore
              saldo_p = (pago - item.mora).toFixed(2)
              if (saldo_p < 0) {
                // @ts-ignore
                saldo_p = (item.mora - pago).toFixed(2)
              }
            }

            // @ts-ignore
            saldo = (saldo - pago).toFixed(2);
            if (saldo < 0)
              saldo = 0;

            pagosDistribuidos.push({
              status: 2,
              pago_id: item.id,
              tipo: 'Mora',
              detalle: 'Mora ' + item.detalle,
              pendiente: item.mora,
              pagara:    pago,
              saldo:     saldo_p,
              hay:       saldo
            })
          }

          if (saldo > 0 && item.estado === 2 || item.estado === 1){
            if (saldo > item.saldo_cap){
              pago = item.saldo_cap;
              saldo_p = 0;
            }else{
              // @ts-ignore
              pago = (item.saldo_cap - saldo).toFixed(2);
              // @ts-ignore
              saldo_p = (pago - item.saldo_cap).toFixed(2);
              if (saldo_p < 0){
                pago = saldo
                // @ts-ignore
                saldo_p = (item.saldo_cap - pago).toFixed(2)
              }
            }
            // @ts-ignore
            saldo = (saldo - pago).toFixed(2);

            pagosDistribuidos.push({
              status: 1,
              pago_id: item.id,
              tipo: 'Letra',
              detalle: item.detalle,
              pendiente: item.saldo_cap,
              pagara:    pago,
              saldo:     saldo_p,
              hay:       saldo
            });
          }
        }
      });
      // @ts-ignore
      setpagosDistribuidos(pagosDistribuidos);
    }else{
      Alert.alert('Error en los Pagos','Esta cuenta tiene un error en uno de sus pagos. Por favor comunicate con soporte tecnico.');
      setpagosDistribuidos([])
    }
  };
  const crearRecibo = ({...state}:DataCrearRecibo) =>{
    setLoad(true);
    tilkApi.post<DataResCrearRecibo>('/caja/postear/cuenta',{
      sucursal_id:  state.sucursal_id,
      total:        state.total,
      venta_id:     state.venta_id,
      observacion:  state.observacion,
      pagos:        state.pagos,
      caja_id:      state.caja_id,
      saldo_actual: state.saldo_actual,
      forma_pago:   state.forma_pago,
      referencia:   state.referencia,
      ccBanco:      state.ccBanco,
      recordatorio: state.recordatorio
    }).then((res)=>{
      actualizarVenta(res.data.reciboId, res.data.codigo, res.data.clave, state);
    }).catch((e)=>{
      console.log(e)
      setLoad(false);
      Alert.alert('Error en el Servidor','Hubo un error al crear el recibo');
      navegation.navigate('RecibosScreen');
      setDrawer(true);
    });
  };
  const actualizarVenta = (reciboId:Number,codigo:String,clave:String, data:DataCrearRecibo)=>{
    tilkApi.post('/caja/postear/cuenta/actualizar_venta',{
      recibo:     reciboId,
      pagos:      data.pagos,
      venta_id:   data.venta_id,
      total:      data.total,
      forma_pago: data.forma_pago,
      ccBanco:    data.ccBanco,
      caja_id:    data.caja_id
    }).then((res)=>{
        actualizarCaja(reciboId, codigo,clave, data);
    }).catch(()=>{
      setLoad(false);
      Alert.alert('Error en el Servidor','Hubo un error al actualizar la venta. El recibo si se creó');
      navegation.navigate('RecibosScreen');
      setDrawer(true);
    });
  };
  const actualizarCaja = (reciboId:Number,codigo:String,clave:String, data:DataCrearRecibo) =>{
    tilkApi.post('/caja/postear/cuenta/actualizar_caja',{
      caja_id:    data.caja_id,
      forma_pago: data.forma_pago,
      referencia: data.referencia,
      recibo:     reciboId,
      total:      data.total
    }).then((res)=>{
      actualizarPortafolio(reciboId, codigo, clave, data)
    }).catch(()=>{
      setLoad(false);
      Alert.alert('Error en el Servidor','Hubo un error al actualizar la caja. El recibo si se creó y la venta se actualizo');
      navegation.navigate('RecibosScreen');
      setDrawer(true);
    });
  };
  const actualizarPortafolio = (reciboId:Number, codigo:String, clave:String, data:DataCrearRecibo)=>{
    tilkApi.post('/caja/postear/cuenta/actualizar_portafolio',{
      reciboId,
      venta_id:     data.venta_id,
      total:        data.total,
      recordatorio: data.recordatorio
    }).then((res)=>{
      imprimirRecibo(clave, codigo).then(()=>{
        setLoad(false);
        Alert.alert('Registro Exitoso','Se ha posteado exitosamente la cuenta.');
        navegation.navigate('RecibosScreen');
        setDrawer(true);
      })
    }).catch(()=>{
      setLoad(false);
      Alert.alert('Error en el Servidor','Hubo un error al actualizar el portafolio. El recibo si se creó, la venta se actualizo y la caja se actualizo');
      navegation.navigate('RecibosScreen');
      setDrawer(true);
    });
  };
  const imprimirRecibo = async (codigo:String, clave:String) =>{
    getDocumento(codigo,null, clave);
  }

  return {
    pagosDistribuidos,
    distribuirPagos,
    load,
    crearRecibo,
  }
}
