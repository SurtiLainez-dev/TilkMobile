import { ActivityIndicator, FlatList, Text, View } from "react-native";
import ListaTheme from "../theme/ListaTheme";
import { usePortafolio } from "../hooks/usePortafolio";
import { ListaPortafolios } from "../components/ListaPortafolios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export const PortafolioScreen = () =>{
  const {loading, portafolios} = usePortafolio();

  if(loading){
    return (
      <View>
        <ActivityIndicator color="red" size={100}/>
      </View>
    )
  }

  return(
    <View style={ListaTheme.mainContainer}>
      {
        (portafolios.length > 0)?(
          <FlatList style={{marginTop: 10}} data={portafolios} renderItem={({item}) =>
            <ListaPortafolios
              sucural={item.sucursal.nombre}
              nombre={item.nombre}
              id={item.id}
              cantidad={item.cant_cuentas}
              vista={1}
            />
          }
            keyExtractor={item => item.id.toString()}
          />
        ):(
          <Text style={{fontWeight: 'bold', fontSize: 16, color:'#000'}}>No tienes asignado ningun portafolio</Text>
        )
      }
    </View>
  )
}
