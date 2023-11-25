import { Animated, View } from "react-native";
import Image = Animated.Image;

export const Logo = () =>{
  return(
    <View style={{alignItems: 'center'}}>
      <Image
        style={{
          width: 110,
          height: 100
        }}
        source={require('../assets/logo.png')}
      />
    </View>
  )
}
