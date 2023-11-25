import { Text, View } from "react-native";
interface Props{
  telefono: {
    detalle: String,
    num: String,
    area?: String | Number | null | undefined
  }
}
export const ListaTelefonos = ({telefono}:Props) =>{
  return(
    <View style={{marginHorizontal: 10, borderBottomColor:'#F2F3F4', borderBottomWidth: 1}}>
      <Text style={{color:'#000000', fontSize: 18, fontWeight:'bold'}}>{telefono.detalle}</Text>
      <Text style={{color:'#000000', fontSize: 14, fontWeight:'bold', marginLeft:10}}>
        {telefono.area}  {telefono.num.toString()}
      </Text>
    </View>
  )
}
