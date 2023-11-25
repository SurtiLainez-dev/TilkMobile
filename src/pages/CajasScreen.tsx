import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import CajasContext from "../context/CajasContext";
import { ListaDetalles } from "../components/ListaDetalles";
import { ListaDetallesNum } from "../components/ListaDetallesNum";
import ListaTheme from "../theme/ListaTheme";
import { ListaCajas } from "../components/ListaCajas";

export const CajasScreen = () =>{
  const {getCajas, loadCajas, totalIngresos, totalEgresos, totalTarjeta, cajas} = useContext(CajasContext);
  useEffect(()=>{
    getCajas()
  },[])

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getCajas();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  if (loadCajas){
    return (
      <View>
        <ActivityIndicator color="#28B463" size={100}/>
      </View>
    );
  }
  return(
    <View style={ListaTheme.mainContainer}>
      <ListaDetallesNum titulo="Total de Ingresos" total={totalIngresos}/>
      <ListaDetallesNum titulo="Total de Egresos" total={totalEgresos}/>
      <ListaDetallesNum titulo="Total con Tarjeta" total={totalTarjeta}/>
      <View style={{borderBottomWidth: 1, borderBottomColor: '#ABB2B9'}}></View>
      <Text style={{fontSize: 16, color:'#000', marginLeft: 6}}>Cajas:</Text>
      <FlatList style={{marginTop: 10}} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
        data={cajas}
        renderItem={({item})=>
          <ListaCajas caja={item} tipo={1}/>
      }
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}
