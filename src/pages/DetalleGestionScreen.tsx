import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useContext } from "react";
import VentaContext from "../context/tilk/VentaContext";
import { useNavigation } from "@react-navigation/native";
import { ListaDetalles } from "../components/ListaDetalles";

export const DetalleGestionScreen = () => {
  const {datosGestion, gestion, removeDatosGestion} = useContext(VentaContext);
  const navegation: any = useNavigation();
  const onClick = () =>{
    navegation.navigate('VerDetallesGestion');
    removeDatosGestion();
  }
  return(
    <View>
      <View style={{marginLeft: 5,  borderBottomWidth: 1, borderBottomColor:'#ABB2B9'}}>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={{flex: 1}} onPress={()=>onClick()}>
            <Icon name="arrow-back-circle-outline" color="orange" size={45}/>
          </TouchableOpacity>
          <View style={{ flex: 7, justifyContent:'center'}}>
            <Text style={{fontSize: 16, fontWeight:'bold', color:'#000',}}>{gestion?.cliente.nombres+' '+gestion?.cliente.apellidos}</Text>
            <Text style={{fontSize: 11, fontWeight:'bold', color:'#000',}}>{gestion?.cod}</Text>
            <Text style={{fontSize: 11, fontWeight:'bold', color:'#000'}}>Detalles de una Gestion</Text>
          </View>
        </View>
      </View>
      <ListaDetalles titulo="Perfil del Usuario" subTitulo={datosGestion?.user}/>
      <ListaDetalles titulo="Hecha por" subTitulo={datosGestion?.colaborador_responsable}/>
      <ListaDetalles titulo="Fecha de Gestión" subTitulo={datosGestion?.fecha_gestionado}/>
      <ListaDetalles titulo="Fecha de Guardado" subTitulo={datosGestion?.fecha_guardado}/>
      <ListaDetalles titulo="Forma de Contacto" subTitulo={datosGestion?.forma_contacto}/>
      <ListaDetalles titulo="Resultado" subTitulo={datosGestion?.resultado_gestion}/>
      <ListaDetalles titulo="Comentario" subTitulo={datosGestion?.comentario}/>
      <ListaDetalles titulo="Fecha del Proximo Recordatorio" subTitulo={datosGestion?.fecha_recordatorio}/>
    </View>
  )
}
