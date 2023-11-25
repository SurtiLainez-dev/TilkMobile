import { FlatList, View } from "react-native";
import { HeaderGenerico } from "../../components/HeaderGenerico";
import { useContext } from "react";
import VentaContext from "../../context/tilk/VentaContext";
import { ListaGestiones } from "../../components/ListaGestiones";
import { dataResultsFilter } from "../../helpers/FilterHelper";
import { useForm } from "../../hooks/useFom";

export const TodasGestiones = () => {
  const {gestiones} = useContext(VentaContext);
  const {search,onChange} = useForm({
    search: ''
  })

  return(
    <View style={{backgroundColor:'white'}}>
      <HeaderGenerico titulo="Todas las Gestiones"/>
      <FlatList style={{marginBottom: 50}}
        data={gestiones?.gestiones}
        renderItem={({item})=> <ListaGestiones gestion={item}/>
        }
        // keyExtractor={({item})=> item.id.toString()}
        />
    </View>
  )
}
