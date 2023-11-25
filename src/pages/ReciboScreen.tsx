import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import CajasContext from "../context/CajasContext";
import ListaTheme from "../theme/ListaTheme";
import { ListaCajas } from "../components/ListaCajas";

export const ReciboScreen = () =>{
  const {getCajas_x_Sucursales, loadCajas, cajas_x_Sucursales} = useContext(CajasContext);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(()=>{
    getCajas_x_Sucursales()
  },[])

  if (loadCajas){
    return (
      <View>
        <ActivityIndicator color="#28B463" size={100}/>
      </View>
    );
  }

  const onRefresh = () =>{
    getCajas_x_Sucursales();
    setRefreshing(true);
    setTimeout(()=>{
      setRefreshing(false);
    },500)
  }

  return(
    <View style={ListaTheme.mainContainer}>
      <View style={{borderBottomWidth: 1, borderBottomColor: '#ABB2B9'}}></View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
                data={cajas_x_Sucursales}
                renderItem={({item})=>
                  <ListaCajas caja={item} tipo={2}/>
                }
                keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}
