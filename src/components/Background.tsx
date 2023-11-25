import { View, Dimensions } from "react-native";
const heihgtScreen = Dimensions.get('screen').height;
export const Background = () =>{
  return(
    <View style={{
      position: 'absolute',
      backgroundColor: '#5D6D7E',
      top: -410,
      width: heihgtScreen < 800 ?(heihgtScreen+150):(heihgtScreen+330),
      height: 1200,
      transform:[
        {rotate: '-70deg'}
      ]
    }}/>
  )
}
