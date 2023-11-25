import { Text, TouchableOpacity, View } from "react-native";
import { Recibo } from "../interfaces/Accountsnterface";
import { useContext } from "react";
import VentaContext from "../context/tilk/VentaContext";
import ListaTheme from "../theme/ListaTheme";
interface Props{
  recibo: Recibo
}
export const ListaDetallesLink = ({recibo}:Props) =>{
  const {solicitarClave} = useContext(VentaContext);
  return(
    <View style={{...ListaTheme.containerList}}>
      <TouchableOpacity
        onPress={()=> solicitarClave(recibo.codigo, recibo.file)}
        activeOpacity={0.5}>
        <Text style={{fontSize: 20, color:'#000'}}>{recibo.codigo}</Text>
        <View style={{flexDirection:'row', marginLeft: 10}}>
          <Text style={{flex: 1, fontSize: 17, color:'#ABB2B9'}}>
            {recibo.fecha?.split('-')[2]}/{recibo.fecha?.split('-')[1]}/{recibo.fecha?.split('-')[0]}
          </Text>
          <Text style={{flex: 1, textAlign:'right', fontSize: 17}}>L. {Intl.NumberFormat().format(recibo.total)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
