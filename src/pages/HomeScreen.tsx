import { useContext, useEffect } from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { Text, TouchableOpacity, View } from "react-native";
import AuthContext from "../context/AuthContext";
import Icon from "react-native-vector-icons/Ionicons";
import { StackScreenProps } from "@react-navigation/stack";
import { getHeaderTitle } from '@react-navigation/elements';
interface Props extends DrawerScreenProps<any, any>{};
export const HomeScreen = ({navigation}:Props) =>{
  const  {setDrawer} = useContext(AuthContext)

  useEffect(()=>{
    setDrawer(true);
  },[])

  return (
      <View style={{backgroundColor:'white', flex: 1}}>


        <Text style={{color:'#000'}}>Esta area se va usar para mostrar gestiones del cobrador</Text>
      </View>
  );
};
