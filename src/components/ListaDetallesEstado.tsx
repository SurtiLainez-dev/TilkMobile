import { ColorValue, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface Props{
  titulo: String,
  estado: String | undefined,
  color:  String | ColorValue | undefined
}
export const ListaDetallesEstado = ({titulo, estado, color}:Props) =>{
  return(
    <View>
      <View style={{marginHorizontal: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color:'#000'}}>{titulo}</Text>
        <View style={{flexDirection: 'row', marginLeft: 10}}>
          <Text style={{flex: 1}}><Icon name="return-down-forward-outline" size={20}/></Text>
          <Text style={{fontSize: 16, flex:10, color:color}}>
            {estado}
          </Text>
        </View>
      </View>
    </View>
  )
}
