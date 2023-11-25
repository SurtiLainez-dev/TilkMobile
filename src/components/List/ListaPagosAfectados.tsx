import { StyleSheet, Text, View } from "react-native";
import { PagosDistribuidosInterface } from "../../interfaces/CajasInterface";
interface Props{
  pago: PagosDistribuidosInterface
}
export const ListaPagosAfectados = ({pago}:Props) => {
  return(
    <View style={{marginHorizontal: 10, borderBottomWidth: 1, borderBottomColor:'black'}}>
      <View style={{flexDirection:'row'}}>
        <Text style={{fontSize: 20, fontWeight:'bold', flex:1, color:'#000'}}>{pago.detalle}</Text>
      </View>
      <View>
        <Text style={{...styles.subtitle,flex: 7, fontWeight: 'bold', color:'#000'}}>Tipo: {pago.tipo}</Text>
      </View>
      <View>
        <Text style={{...styles.subtitle,flex: 7, fontWeight: 'bold', color:'#000'}}>Pendiente: L. {Intl.NumberFormat().format(pago.pendiente)}</Text>
      </View>
      <View>
        <Text style={{...styles.subtitle,flex: 7, fontWeight: 'bold', color:'#000'}}>Pagará: L. {Intl.NumberFormat().format(pago.pagara)}</Text>
      </View>
      <View>
        <Text style={{...styles.subtitle,flex: 7, fontWeight: 'bold', color:'#000'}}>Saldo: L. {Intl.NumberFormat().format(pago.saldo)}</Text>
      </View>
      <View>
        <Text style={{...styles.subtitle,flex: 7, fontWeight: 'bold', color:'#000'}}>Aún Hay: L. {Intl.NumberFormat().format(pago.hay)}</Text>
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
