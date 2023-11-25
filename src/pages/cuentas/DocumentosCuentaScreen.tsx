import { ActivityIndicator, FlatList, View } from "react-native";
import { HeaderDetalleCuentas } from "../../components/HeaderDetalleCuentas";
import { useContext } from "react";
import VentaContext from "../../context/tilk/VentaContext";
import { ListaDetallesLink } from "../../components/ListaDetallesLink";

export const DocumentosCuentaScreen = () =>{
  const {venta, loadRecibo} = useContext(VentaContext);

  if (loadRecibo){
    return (
      <View>
        <ActivityIndicator color="#28B463" size={100}/>
      </View>
    );
  }
  return (
    <View style={{backgroundColor:'#FDFEFE', marginBottom: 50}}>
      <HeaderDetalleCuentas titulo={venta?.cliente.nombres+' '+venta?.cliente.apellidos} codigo={venta.cod}/>
      <FlatList
        data={venta?.recibos}
        renderItem={({item})=><ListaDetallesLink recibo={item} />}
        />
    </View>
  );
};
