import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import VentaContext from "../context/tilk/VentaContext";
import AuthContext from "../context/AuthContext";
interface Props{
  titulo: String | undefined,
  codigo: String | null | string | undefined,
}
export const HeaderDetalleCuentas = ({titulo, codigo = '--'}:Props) =>{
  const {removeVenta, tipoBack} = useContext(VentaContext);
  const {setDrawer} = useContext(AuthContext);
  const navegation = useNavigation();
  const onClick = () =>{
    if (tipoBack === 'goCuentas'){
      // @ts-ignore
      navegation.navigate('CuentasScreen');
      setDrawer(true);
    }else if (tipoBack === 'goCaja'){
      // @ts-ignore
      navegation.navigate('TabCajaScreen');
    }
    removeVenta();
  };

  return(
    <View style={{marginHorizontal: 5, marginVertical: 3, borderBottomWidth: 1,
      borderBottomColor:'#D5D8DC', marginBottom: 10}}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={()=> onClick()}
      >
        <View style={{flexDirection:'row'}}>
          <Text style={{flex: 1}}>
            <Icon name="arrow-back-circle-outline" color="orange" size={45}/>
          </Text>
          <View style={{flex: 7, justifyContent: 'center'}}>
            <Text style={{fontSize: 13, color:'#ABB2B9'}}>{codigo}</Text>
            <Text style={{ marginTop: 6, textAlign: 'left', fontSize: 16, color:'#ABB2B9'}}>{titulo}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}
