import { ActivityIndicator, View, FlatList, TextInput, RefreshControl } from "react-native";
import { useAccount } from "../hooks/useAccount";
import { ListaCuentas } from "../components/ListaCuentas";
import ListaTheme from "../theme/ListaTheme";
import { dataResultsFilter } from "../helpers/FilterHelper";
import { useForm } from "../hooks/useFom";
import { useState } from "react";



export const CuentasScreen = () =>{
  const {cuentas, isLoading, onCuentas, allCuentas, getCuentas} = useAccount();
  const [refreshing, setRefreshing] = useState(false);
  const {search, onChange} = useForm({
    search: ''
  });

  if(isLoading){
    return (
      <View>
        <ActivityIndicator color="red" size={100}/>
      </View>
    )
  }

  const onRefresh = () =>{
    getCuentas();
    setRefreshing(true);
    setTimeout(()=>{
      setRefreshing(false);
    },500)
  }

  const changeText = (value:String) =>{
    onCuentas(dataResultsFilter(value, allCuentas));
    onChange(value,'search');
  }

  // @ts-ignore
  return(
    <View style={ListaTheme.mainContainer}>
      <View style={{backgroundColor:'white'}}>
        <TextInput
          style={ListaTheme.inputBusqueda}
          onChangeText={(value => changeText(value))}
          value={search}
          placeholder="Buscar cuenta ..."
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <FlatList
        // @ts-ignore
        style={{marginTop: 10}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={cuentas}
        renderItem={({item}) =>
          <ListaCuentas
            tipo="verCuenta"
            fullName={item.nombres+' '+item.apellidos}
            identidad={item.identidad}
            cod={item.cod}
            estado={item.estado}
            id={item.id}
            total={item.total}
            saldo_actual={item.saldo_actual}
          />
      }
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}
