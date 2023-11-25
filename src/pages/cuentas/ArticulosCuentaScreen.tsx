import { FlatList, View } from "react-native";
import { useContext } from "react";
import VentaContext from "../../context/tilk/VentaContext";
import { HeaderDetalleCuentas } from "../../components/HeaderDetalleCuentas";
import { ListaArticulos } from "../../components/ListaArticulos";

export const ArticulosCuentaScreen = () =>{
  const {venta} = useContext(VentaContext);
  return(
    <View style={{backgroundColor:'white', flex: 1}}>
      <HeaderDetalleCuentas titulo={venta?.cliente.nombres+' '+venta?.cliente.apellidos} codigo={venta.cod}/>
      {
        (venta?.tipo_venta === 2)?(
          <FlatList data={venta.facturas_contados}
                    renderItem={({item})=> <ListaArticulos articulo={item}  />}
          />
        ):null
      }
    </View>
  )
}
