import { ActivityIndicator, FlatList, RefreshControl, Text, TextInput, View } from "react-native";
import { useAccount } from "../../hooks/useAccount";
import { useState } from "react";
import { useForm } from "../../hooks/useFom";
import { dataResultsFilter } from "../../helpers/FilterHelper";
import ListaTheme from "../../theme/ListaTheme";
import { ListaCuentas } from "../../components/ListaCuentas";

export const CajaCuentasScreen = () =>{
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

  return(
    <View style={ListaTheme.mainContainer}>
      <View style={{marginLeft: 10}}>
        <Text style={{color:'#000', fontSize: 20}}>Cuentas</Text>
      </View>
      <View style={{backgroundColor:'white'}}>
        <TextInput
          style={{...ListaTheme.inputBusqueda}}
          onChangeText={(value => changeText(value))}
          value={search}
          placeholder="Buscar cuenta ..."
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <FlatList
        // @ts-ignore
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={cuentas}
        renderItem={({item}) =>
          <ListaCuentas
            tipo="verCaja"
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
