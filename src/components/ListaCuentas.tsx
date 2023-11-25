import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getEstadoCuentas} from "../helpers/EstadosCuentasHelper"
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import VentaContext from "../context/tilk/VentaContext";
import ListaTheme from "../theme/ListaTheme";
type ItemProps = {
  fullName: String,
  identidad: String,
  id: Number,
  cod: String,
  estado: Number,
  saldo_actual: Number,
  total: Number,
  tipo: 'verCaja' | 'verCuenta'
};
export const ListaCuentas = ({fullName, id, identidad, cod, estado, saldo_actual, total, tipo}: ItemProps) =>{
  const navegation: any = useNavigation();
  const {setDrawer} = useContext(AuthContext);
  const {getVenta, setTipoBack} = useContext(VentaContext);
  const onClick = () =>{
    if (tipo === 'verCuenta'){
      setTipoBack('goCuentas');
      navegation.navigate('DetailsCuentaScreen', id);
    } else if (tipo === 'verCaja'){
      setTipoBack('goCaja');
      navegation.navigate('TabCobroScreen');
      getVenta(id);
    }
    setDrawer(false);
  };
  return (
    <TouchableOpacity
      onPress={()=>onClick()}
      activeOpacity={0.8}>
      <View style={{...ListaTheme.containerList, height: 110}}>
        <View style={styles.row}>
          <Text style={{...styles.title, flex: 4}}>{fullName}</Text>
          <Text style={{...styles.title, flex: 2, textAlign:'right', fontSize: 17}}>#{cod}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ ...styles.title, fontSize: 12, color:'#ABB2B9', flex: 4 }}>{identidad}</Text>
          <View style={{flex: 2}}>
            <Text style={{textAlign: 'right', color: getEstadoCuentas(estado)[0]}}>{getEstadoCuentas(estado)[1]}</Text>
          </View>
        </View>
        <Text style={{...styles.title, color:'#ABB2B9'}}>Total Inicial: L.
          {Intl.NumberFormat().format(total)}
        </Text>
        <Text style={{...styles.title, color:'#ABB2B9'}}>Saldo Actual: L.
          {Intl.NumberFormat().format(saldo_actual)}
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
    height: 110,
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
