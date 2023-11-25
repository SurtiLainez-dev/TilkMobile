import { useContext } from "react";
import VentaContext from "../context/tilk/VentaContext";
import { FacturasContado } from "../interfaces/Accountsnterface";
import { Caja } from "../interfaces/CajasInterface";
import { Text, View } from "react-native";
import ListaTheme from "../theme/ListaTheme";
type ItemProps = {
  articulo: FacturasContado
};
export const ListaArticulos = ({articulo}:ItemProps) =>{

  return(
    <View style={{...ListaTheme.containerList, height:140}}>
      <Text style={{fontSize:15, color:'#000', fontWeight:'bold'}}>{articulo.articulo.nombre_articulo}</Text>
      <View style={{marginLeft: 10}}>
        <Text style={{fontSize: 14, color:'#000'}}>Proveedor: {articulo.articulo.marca.proveedor.nombre}</Text>
        <Text style={{fontSize: 14, color:'#000'}}>Marca: {articulo.articulo.marca.nombre}</Text>
        <Text style={{fontSize: 14, color:'#000'}}>Modelo: {articulo.articulo.modelo}</Text>
        <Text style={{fontSize: 14, color:'#000'}}>Cantidad: {articulo.cantidad}</Text>
        {
          (articulo.is_remision === 1 && articulo.remision_articulo_id > 0)?(
            <Text style={{fontSize: 14, color:'#000'}}>Serie del Articulo: {articulo.remision_articulo.serie_fabricante}</Text>
          ):(
            <Text style={{fontSize: 14, color:'#000'}}>Serie del Articulo: #####</Text>
          )
        }
      </View>
    </View>
  )
}
