import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { usePortafolio } from "../hooks/usePortafolio";

interface Props{
  titulo: String
}
export const HeaderGenerico = ({titulo}:Props) =>{
  const {setDrawer} = useContext(AuthContext);
  const navegation = useNavigation();
  const {allPortafolios, portafolios} = usePortafolio();

  const onClick = () =>{
    // @ts-ignore
    if (allPortafolios.length === 0 && portafolios.length > 0){
      navegation.navigate('PortafolioScreen')
    }else{
      navegation.navigate('AllPortafolioScreen');
    }
    setDrawer(true);
  };
  return(
    <View style={{marginLeft: 5,  borderBottomWidth: 1, borderBottomColor:'#ABB2B9'}}>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={{flex: 1}} onPress={()=>onClick()}>
          <Icon name="arrow-back-circle-outline" color="orange" size={45}/>
        </TouchableOpacity>
        <View style={{ flex: 7, justifyContent:'center'}}>
          <Text style={{fontSize: 20, fontWeight:'bold', color:'#000',}}>{titulo}</Text>
        </View>
      </View>
    </View>
  );
};
