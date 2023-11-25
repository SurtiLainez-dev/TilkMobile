import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface Props{
  titulo: String,
  subTitulo: string | null | undefined | String
}
export const ListaDetalles = ({titulo, subTitulo = ''}:Props) =>{
  return(
    <View>
      <View style={{marginHorizontal: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color:'#000'}}>{titulo}</Text>
        <View style={{flexDirection: 'row', marginLeft: 10}}>
          <Text style={{flex: 1}}><Icon name="return-down-forward-outline" size={20}/></Text>
          {
            (subTitulo)?(
              <Text style={{fontSize: 18, color: '#ABB2B9', flex:10}}>{subTitulo}</Text>
            ):(
              <Text style={{fontSize: 18, color: '#ABB2B9', flex:10}}>-----</Text>
            )
          }
        </View>
      </View>
    </View>
  )
}
