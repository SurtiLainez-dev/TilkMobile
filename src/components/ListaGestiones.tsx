import { Gestione } from "../interfaces/PortafolioInterface";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getEstadoCuentas } from "../helpers/EstadosCuentasHelper";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import VentaContext from "../context/tilk/VentaContext";

interface Props{
  gestion: Gestione
}
export const ListaGestiones = ({gestion}:Props) =>{
  const navegation: any = useNavigation();
  const {setGestion, cargarColaboradores, colaboradores} = useContext(VentaContext);
  const onClick = () =>{
    navegation.navigate('VerDetallesGestion');
    setGestion(gestion);
    if (colaboradores.length === 0){
      cargarColaboradores();
    }
  }
  return(
    <TouchableOpacity activeOpacity={0.9} onPress={()=> onClick()}>
      <View style={styles.item}>
        <View style={styles.row}>
          <Text style={{...styles.title, flex: 4}}>{gestion.cliente.nombres+' '+gestion.cliente.apellidos}</Text>
          <Text style={{...styles.title, flex: 2, textAlign:'right', fontSize: 17}}>#{gestion.cod}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ ...styles.title,color:'#ABB2B9', flex: 4 }}>Saldo Actual
            L. {Intl.NumberFormat().format(gestion.saldo_actual)}</Text>
          <View style={{flex: 2}}>
            <Text style={{textAlign: 'right', color: gestion.cob_segmento.color}}>{gestion.cob_segmento.nombre}</Text>
          </View>
        </View>
        <Text style={{...styles.title, color:'#ABB2B9'}}>Dias de Mora: {gestion.dias_mora} dias</Text>
        <Text style={{...styles.title, color:'#ABB2B9'}}>Fecha de Proxima Gestión:
          {
            (gestion.proxima_gestion)? (
              gestion.proxima_gestion.split('-')[2]+'/'+gestion.proxima_gestion.split('-')[1]+'/'+gestion.proxima_gestion.split('-')[0]
            ):('---')
          }
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  row:{
    flexDirection: 'row'
  },
  item: {
    height: 100,
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EBDEF0',
    marginHorizontal: 1,
  },
  title: {
    fontSize: 13,
    color: '#2C3E50',
    fontWeight: "bold"
  },
});
