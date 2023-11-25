import { StyleSheet, Text, View } from "react-native";
import { PagosContrato } from "../interfaces/Accountsnterface";
import { getEstadoCuentas } from "../helpers/EstadosCuentasHelper";
import ListaTheme from "../theme/ListaTheme";
interface Props{
  pago: PagosContrato
}
export const ListaPagos = ({pago}:Props) => {
  return(
    <View style={{...ListaTheme.containerList}}>
      <View style={{flexDirection:'row'}}>
        <Text style={{fontSize: 20, fontWeight:'bold', flex:5, color:'#000'}}>{pago.detalle}</Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight:'bold',
            flex:2,
            color:getEstadoCuentas(pago.estado)[0],
            textAlign: 'right'
        }}
        >{getEstadoCuentas(pago.estado)[1]}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <View style={{flexDirection:'row', flex: 6}}>
          <Text style={{...styles.subtitle,flex: 7, fontWeight: 'bold', color:'#000'}}>Pago Inicial</Text>
          <Text style={{...styles.subtitle2,flex: 5, marginLeft: 2, color:'#000'}}> L. {Intl.NumberFormat().format(pago.pago_inicial)}</Text>
        </View>
        <View style={{flexDirection:'row', flex: 6}}>
          <Text style={{...styles.subtitle,flex: 7, fontWeight: 'bold', textAlign:'right', color:'#000'}}>Total a Pagar</Text>
          <Text style={{...styles.subtitle2,flex: 5, marginLeft: 2, textAlign:'left', color:'#000'}}> L. {Intl.NumberFormat().format(pago.total_pago)}</Text>
        </View>
      </View>

      <View style={{flexDirection:'row'}}>
        <View style={{flexDirection:'row',  flex: 6}}>
          <Text style={{...styles.subtitle, flex: 7, fontWeight: 'bold', color:'#000'}}>Total Abonado</Text>
          <Text style={{...styles.subtitle2,flex: 5, marginLeft: 2, color:'#000'}}> L. {Intl.NumberFormat().format(pago.total_abonado)}</Text>
        </View>
        <View style={{flexDirection:'row', flex: 6}}>
          <Text style={{...styles.subtitle,flex: 7, fontWeight: 'bold', textAlign:'right', color:'#000'}}>Saldo Actual</Text>
          <Text style={{...styles.subtitle2,flex: 5,  marginLeft: 2, textAlign:'left', color:'#000'}}> L. {Intl.NumberFormat().format(pago.saldo_actual)}</Text>
        </View>
      </View>

      <View style={{flexDirection:'row'}}>
        <View style={{flexDirection:'row', flex: 6}}>
          <Text style={{...styles.subtitle,flex: 7, fontWeight: 'bold', color:'#000'}}>Mora</Text>
          <Text style={{...styles.subtitle2,flex: 5, marginLeft: 2, color:'#000'}}> L. {Intl.NumberFormat().format(pago.mora)}</Text>
        </View>
        <View style={{flexDirection:'row', flex: 6}}>
          <Text style={{...styles.subtitle,flex: 7, fontWeight: 'bold', textAlign:'right', color:'#000'}}>Capital</Text>
          <Text style={{...styles.subtitle2,flex: 5,  marginLeft: 2, textAlign:'left', color:'#000'}}> L. {Intl.NumberFormat().format(pago.capital)}</Text>
        </View>
      </View>

      <View style={{flexDirection:'row', marginBottom: 10}}>
        <View style={{flexDirection:'row', flex: 6}}>
          <Text style={{...styles.subtitle,flex: 7, fontWeight: 'bold', color:'#000'}}>Fecha de Pago</Text>
          <Text style={{...styles.subtitle2,flex: 5, marginLeft: 2, color:'#000'}}>
            {pago.fecha_pago.split('-')[2]}/
            {pago.fecha_pago.split('-')[1]}/
            {pago.fecha_pago.split('-')[0]}
          </Text>
        </View>
        <View style={{flexDirection:'row', flex: 6}}>

        </View>
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  subtitle:{
    fontSize: 12
  },
  subtitle2:{
    fontSize: 11
  }
})
