import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ListaTheme from "../theme/ListaTheme";

type ItemProps = {
  fullName: String,
  identidad: String,
  id: Number,
  email: String | null
};
export const ListaClients = ({fullName, id, identidad, email}: ItemProps) =>{


  return(
    <TouchableOpacity activeOpacity={0.8}>
      <View style={{...ListaTheme.containerList, height: 80}}>
        <Text style={{...ListaTheme.titleLista, fontSize: 16}}>{fullName}</Text>
        <Text style={{color:'#AEB6BF'}}>{identidad}</Text>
        <Text style={{fontSize: 11, color:'#AEB6BF'}}>Correo: {email}</Text>
      </View>
    </TouchableOpacity>
  )
}

