import { FlatList, ScrollView, Text, View } from "react-native";
import { useContext } from "react";
import VentaContext from "../../context/tilk/VentaContext";
import { HeaderDetalleCuentas } from "../../components/HeaderDetalleCuentas";
import { ListaPagos } from "../../components/ListaPagos";


export const PagosCuentaScreen = () =>{
  const {venta} = useContext(VentaContext);
  return(
    <View style={{backgroundColor:'#FDFEFE'}}>
      <HeaderDetalleCuentas titulo={venta?.cliente.nombres+' '+venta?.cliente.apellidos} codigo={venta?.cod}/>
      <FlatList style={{marginBottom: 55}}
        data={venta?.pagos_contratos}
        renderItem={({item})=> <ListaPagos pago={item}/>
        }
        keyExtractor={(item)=> item.id.toString()}
      />
    </View>
  )
}
