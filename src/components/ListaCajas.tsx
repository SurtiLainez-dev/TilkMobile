import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Caja } from "../interfaces/CajasInterface";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import CajasContext from "../context/CajasContext";
import ListaTheme from "../theme/ListaTheme";

type ItemProps = {
  caja: Caja,
  tipo: Number
};
export const ListaCajas = ({caja, tipo}: ItemProps) =>{
  const navegation: any = useNavigation();
  const {setDrawer, user} = useContext(AuthContext);
  const {setCaja} = useContext(CajasContext);
  const onClick = () =>{
    setCaja(caja);
    navegation.navigate('TabCajaScreen');
    setDrawer(false);
  };
  const validarUsuarioCaja = () =>{
    if (user?.id !== caja?.user_id && tipo === 2){
      Alert.alert('Error de Validación', 'No tienes acceso a la caja que seleccionaste')
    }else if (tipo === 2){
      onClick();
    }
  }
  return(
    <TouchableOpacity activeOpacity={0.8} onPress={()=>validarUsuarioCaja()}>
      <View style={{...ListaTheme.containerList, height:80}}>
        <Text style={{...styles.title, fontSize: 16}}>{caja?.sucursal.nombre}</Text>
        <Text style={{fontSize: 20, color:'#ABB2B9'}}>Total: L. {Intl.NumberFormat().format(caja?.total)}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container1:{
    display: 'flex',
  },
  row:{
    flexDirection: 'row'
  },
  item: {
    height: 80,
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
