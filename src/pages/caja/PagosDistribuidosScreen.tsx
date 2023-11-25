import { FlatList, Text, View } from "react-native";
import ListaTheme from "../../theme/ListaTheme";
import { ListaPagosAfectados } from "../../components/List/ListaPagosAfectados";
import { PagosDistribuidosInterface } from "../../interfaces/CajasInterface";
interface Props{
  pagosAfectados: PagosDistribuidosInterface []
}
export const PagosDistribuidosScreen = ({ pagosAfectados }:Props) =>{
  return (
    <View style={{marginTop: 10, marginLeft: 15}}>
      <Text style={{color: '#000'}}>Pagos Afectados: </Text>
      <FlatList data={pagosAfectados}
                renderItem={({item})=> <ListaPagosAfectados pago={item}/>
      }
      />
    </View>
  )
}
