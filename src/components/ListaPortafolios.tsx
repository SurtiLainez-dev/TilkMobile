import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import VentaContext from "../context/tilk/VentaContext";
import { usePortafolio } from "../hooks/usePortafolio";
import ListaTheme from "../theme/ListaTheme";

type ItemProps = {
  sucural: String,
  nombre: String,
  id: Number,
  cantidad: Number,
  vista: Number
};
export const ListaPortafolios = ({sucural, nombre, id, cantidad, vista}: ItemProps) =>{

  const navegation: any = useNavigation();
  const {setDrawer} = useContext(AuthContext);
  const {setPortafolioId} = useContext(VentaContext);
  const onClick = () =>{
    setPortafolioId(id);
    navegation.navigate('DetailPortafolioScreen');
    setDrawer(false);
  };
  return(
    <TouchableOpacity
      onPress={()=> onClick()}
      activeOpacity={0.8}>
      <View style={{...ListaTheme.containerList}}>
        <Text style={{...styles.title, fontSize: 16}}>{nombre}</Text>
        <Text style={{color:'#000'}}>{sucural}</Text>
        <Text style={{fontSize: 13, color:'#000'}}>{cantidad.toString()} cuentas</Text>
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
    borderTopWidth: 1,
    borderTopColor: '#EBDEF0',
    marginHorizontal: 1,
  },
  title: {
    fontSize: 13,
    color: '#2C3E50',
    fontWeight: "bold"
  },
});
