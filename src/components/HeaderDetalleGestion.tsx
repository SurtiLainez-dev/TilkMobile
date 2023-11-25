import { ColorValue, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

interface Props{
  titulo: String | undefined;
  codigo: String | undefined;
  color: String | ColorValue | undefined;
  segmento: String | undefined
}
export const HeaderDetalleGestion = ({titulo = 'probabndo', codigo = '-', color, segmento = '-----'}:Props) =>{
  const navegation = useNavigation();
  const onClick = () =>{
    // @ts-ignore
    navegation.navigate('DetailPortafolioScreen');
  };
  return(
    <View style={{marginLeft: 5,  borderBottomWidth: 1, borderBottomColor:'#ABB2B9'}}>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={{flex: 1}} onPress={()=>onClick()}>
          <Icon name="arrow-back-circle-outline" color="orange" size={45}/>
        </TouchableOpacity>
        <View style={{ flex: 7, justifyContent:'center'}}>
          <Text style={{fontSize: 16, fontWeight:'bold', color:'#000',}}>{titulo}</Text>
          <Text style={{fontSize: 11, fontWeight:'bold', color:'#000',}}>{codigo}</Text>
          <Text style={{fontSize: 11, fontWeight:'bold', color:color}}>{segmento}</Text>
        </View>
      </View>
    </View>
  );
};
