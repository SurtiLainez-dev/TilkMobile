import { ScrollView, View } from "react-native";
import { HeaderDetalleCuentas } from "../../components/HeaderDetalleCuentas";
import { useContext } from "react";
import VentaContext from "../../context/tilk/VentaContext";
import { ListaDetalles } from "../../components/ListaDetalles";
import { getEstadoCuentas, getTipoCuenta } from "../../helpers/EstadosCuentasHelper";
import { ListaDetallesNum } from "../../components/ListaDetallesNum";
import { ListaDetallesEstado } from "../../components/ListaDetallesEstado";

export const InicioCuentaScreen = () =>{
  const {venta} = useContext(VentaContext);
  const tipo:String = getTipoCuenta(venta.tipo_venta);
  return(
    <View style={{backgroundColor:'#FDFEFE'}}>
      <HeaderDetalleCuentas titulo={venta?.cliente.nombres+' '+venta?.cliente.apellidos} codigo={venta.cod}/>
      <ScrollView>
        <ListaDetalles titulo="Identidad" subTitulo={venta?.cliente.identidad}/>
        <ListaDetalles titulo="Tipo de Cuenta" subTitulo={tipo}/>
        <ListaDetalles titulo="Codigo de la Cuenta" subTitulo={venta?.cod}/>
        <ListaDetalles titulo="Sucursal" subTitulo={venta?.sucursal.nombre}/>
        <ListaDetalles titulo="Vendedor" subTitulo={venta?.colaborador.nombres+' '+venta?.colaborador.apellidos}/>
        <ListaDetallesNum  titulo="Saldo Inicial" total={venta?.total}/>
        <ListaDetallesNum  titulo="Total Anonado" total={venta?.total_abonado}/>
        <ListaDetallesNum  titulo="Total en Mora" total={venta?.mora}/>
        <ListaDetallesNum  titulo="Saldo Actual"  total={venta?.saldo_actual}/>
        <ListaDetallesNum  titulo="Saldo Capital" total={venta?.saldo_actual_cap}/>
        <ListaDetallesEstado titulo="Estado" estado={getEstadoCuentas(venta?.estado)[1]} color={getEstadoCuentas(venta?.estado)[0]}/>
        <ListaDetallesNum  titulo="# de Cuotas"   total={venta.num_cuotas}/>
        <ListaDetalles  titulo="Portafolio" subTitulo={venta?.cob_segmento.nombre}/>
        <View style={{marginTop: 80}}></View>
      </ScrollView>
    </View>
  )
}
