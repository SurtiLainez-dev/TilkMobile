import { ScrollView, Text, View } from "react-native";
import { useContext } from "react";
import VentaContext from "../../context/tilk/VentaContext";
import { ListaDetalles } from "../../components/ListaDetalles";
import { ListaDetallesNum } from "../../components/ListaDetallesNum";
import { HeaderGenerico } from "../../components/HeaderGenerico";
import { ListaDetallesEstado } from "../../components/ListaDetallesEstado";
import { getTipoPortafolio } from "../../helpers/EstadosCuentasHelper";
export const InicioPortafolio = () => {
  const {portafolio} = useContext(VentaContext);
  const Portafolio = portafolio?.portafolio
  return(
    <View style={{backgroundColor:'white', flex: 1}}>
      <HeaderGenerico titulo="Inicio"/>
      <ScrollView style={{marginBottom: 50}}>
        <ListaDetalles titulo="Nombre del Portafolio" subTitulo={Portafolio?.nombre}/>
        <ListaDetalles titulo="Sucursal" subTitulo={Portafolio?.sucursal.nombre}/>
        <ListaDetalles titulo="Usuario Responsable" subTitulo={Portafolio?.user.usuario}/>
        <ListaDetallesNum titulo="Saldo Capital" total={0}/>
        <ListaDetallesNum titulo="Saldo Corriente" total={0}/>
        <ListaDetallesNum titulo="Total de Cuotas" total={0}/>
        <ListaDetallesNum titulo="Proyección" total={0}/>
        <ListaDetallesNum titulo="Cumplimiento" total={0}/>
        <ListaDetalles titulo="Normailidad Proyectada" subTitulo={Portafolio?.proyeccion_normalidad.toString()}/>
        <ListaDetalles titulo="Normailidad Acutal" subTitulo={Portafolio?.normalidad.toString()}/>
        <ListaDetalles titulo="Cantidad de Cuentas" subTitulo={Portafolio?.cant_cuentas.toString()}/>
        <ListaDetallesEstado titulo="Tipo de Cuenta" estado={getTipoPortafolio(Portafolio?.gerencial)[0]}
                             color={getTipoPortafolio(Portafolio?.gerencial)[1]}/>

      </ScrollView>
    </View>
  )
}
