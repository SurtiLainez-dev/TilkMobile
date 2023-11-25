import { ActivityIndicator, FlatList, Text, TextInput, View } from "react-native";
import ListaTheme from "../theme/ListaTheme";
import { useClient } from "../hooks/useClients";
import { ListaClients } from "../components/ListaClients";
import { useForm } from "../hooks/useFom";
import { dataResultsFilter } from "../helpers/FilterHelper";

export const ClietsScreen = () =>{
  const {clients, isLoadig, allClients, onClients} = useClient();
  const {search, onChange} = useForm({
    search: ''
  });

  if(isLoadig){
    return (
      <View>
        <ActivityIndicator color="red" size={100}/>
      </View>
    )
  }

  const changeText = (value:String) =>{
    onClients(dataResultsFilter(value, allClients));
    onChange(value,'search');
  }

  return(
    <View style={ListaTheme.mainContainer}>
      <View>
        <TextInput
          style={ListaTheme.inputBusqueda}
          placeholderTextColor="#000000"
          placeholder="Buscar cliente ..."
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(value => changeText(value))}
          value={search}
        />
      </View>

      <View >
        <FlatList
          style={{marginTop: 10}}
          data={clients}
          renderItem={({item}) =>
            <ListaClients
              fullName={item.nombres+' '+item.apellidos}
              id={item.id}
              identidad={item.identidad}
              email={item.email}
            />
          }
          keyExtractor={item => item.id.toString()}
        />
      </View>

    </View>
  )
}
