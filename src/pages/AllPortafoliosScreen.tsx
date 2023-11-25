import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { usePortafolio } from "../hooks/usePortafolio";
import ListaTheme from "../theme/ListaTheme";
import { ListaPortafolios } from "../components/ListaPortafolios";

export const AllPortafoliosScreen = () =>{
  const {loadingAll, allPortafolios} = usePortafolio();

  if(loadingAll){
    return (
      <View>
        <ActivityIndicator color="red" size={100}/>
      </View>
    )
  }
  return(
    <View style={ListaTheme.mainContainer}>
      {
        (allPortafolios.length > 0)?(
          <FlatList style={{marginTop: 10}} data={allPortafolios} renderItem={({item}) =>
            <ListaPortafolios
              sucural={item.sucursal.nombre}
              nombre={item.nombre}
              id={item.id}
              cantidad={item.cant_cuentas}
              vista={2}
            />
          }
            keyExtractor={item => item.id.toString()}
          />
        ):(
          <Text style={{fontWeight: 'bold', fontSize: 16,color:'#000'}}>No hay portafolios </Text>
        )
      }
    </View>
  )
}
