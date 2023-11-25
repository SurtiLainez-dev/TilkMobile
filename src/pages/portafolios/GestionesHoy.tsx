import { FlatList, Text, View } from "react-native";
import { useContext } from "react";
import VentaContext from "../../context/tilk/VentaContext";
import { useForm } from "../../hooks/useFom";
import { HeaderGenerico } from "../../components/HeaderGenerico";
import { ListaGestiones } from "../../components/ListaGestiones";

export const GestionesHoy = () => {
  const {gestionesHoy} = useContext(VentaContext);
  const {search,onChange} = useForm({
    search: ''
  })
  return (
    <View style={{backgroundColor:gestionesHoy.length > 0?'white':'transparent'}}>
      <HeaderGenerico titulo="Gestiones de Hoy"/>
      {
        (gestionesHoy.length > 0)?(
          <FlatList style={{marginBottom: 50}}
                    data={gestionesHoy}
                    renderItem={({item})=> <ListaGestiones gestion={item}/>
                    }
            // keyExtractor={({item})=> item.id.toString()}
          />
        ):(
          <Text style={{marginLeft: 15, fontSize:15, fontWeight:'bold',
            color:'#000', marginTop: 100}}>No hay gestiones pendientes para hoy</Text>
        )
      }
    </View>
  )
}
