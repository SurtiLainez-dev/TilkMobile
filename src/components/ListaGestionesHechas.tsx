import { Gesion } from "../interfaces/PortafolioInterface";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import VentaContext from "../context/tilk/VentaContext";

interface Props{
  gestion:Gesion
}
export const ListaGestionesHechas = ({gestion}:Props) =>{
  const navegation: any = useNavigation();
  const {setDatosGestion} = useContext(VentaContext);
  const onClick = () =>{
    setDatosGestion(gestion);
    navegation.navigate('DetalleGestionScreen');
  }
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={()=>onClick()}>
      <View style={{marginHorizontal: 10, borderBottomColor:'#F2F3F4', borderBottomWidth: 1, height: 60}}>
        <Text style={{color:'#000000', fontSize: 18, fontWeight:'bold'}}>{gestion.colaborador_responsable}</Text>
        <Text style={{color:'#000000', fontSize: 14, fontWeight:'bold'}}>
          {gestion.fecha_guardado}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
