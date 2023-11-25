import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import CajasContext from "../../context/CajasContext";
import ListaTheme from "../../theme/ListaTheme";
import { ListaDetallesNum } from "../../components/ListaDetallesNum";

export const CajaHomeScreen = () =>{
  const {setDrawer} = useContext(AuthContext);
  const {caja} = useContext(CajasContext)
  const navegation = useNavigation();
  const onClick = () =>{
    // @ts-ignore
    navegation.navigate('RecibosScreen');
    setDrawer(true);
  };
  return(
    <View style={ListaTheme.mainContainer}>
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
              <Text style={{fontSize: 13, color:'#ABB2B9'}}>{caja?.codigo}</Text>
              <Text style={{ marginTop: 6, textAlign: 'left', fontSize: 16, color:'#ABB2B9'}}>{caja?.sucursal.nombre}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <ListaDetallesNum titulo="Total de Caja" total={caja?.total}/>
    </View>
  )
}
