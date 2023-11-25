import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from "../../pages/LoginScreen";
import { ConfigScreen } from "../../pages/ConfigScreen";
import { useContext, useEffect } from "react";
import IpContext from "../../context/IpContext";
import { LoadingScreen } from "../../pages/LoadingScreen";
import AuthContext from "../../context/AuthContext";
import { DrawerHome } from "./DrawerHome";
import { DetalleGestionScreen } from "../../pages/DetalleGestionScreen";
const Stack = createStackNavigator();
import SplashScreen from 'react-native-splash-screen'
export const NavigationMain = () =>{
  useEffect(()=>{
    SplashScreen.hide();
  },[]);


  const {status} = useContext(IpContext);
  const {loading, statusAuth} = useContext(AuthContext);

  if (status === 'checkingIp' || loading) return <LoadingScreen/>


  return(
    <Stack.Navigator screenOptions={{
      headerShown: false,
      cardStyle:{
        backgroundColor: 'white'
      }
    }}>
      {
        (status === 'notIp') ? (
          <>
            <Stack.Screen name="ConfigScreen"     component={ConfigScreen}/>
          </>
        ):( (statusAuth === 'not-authenticated')?(
          <>
            <Stack.Screen name="LoginScreen"      component={LoginScreen}/>
            <Stack.Screen name="ConfigScreen"     component={ConfigScreen}/>
          </>
        ):(
            <>
              <Stack.Screen options={{ headerShown: false }} name="DraweHome" component={DrawerHome}/>
              <Stack.Screen options={{ headerShown: false }} name="DetalleGestionScreen" component={DetalleGestionScreen}/>
            </>
          )
        )
      }
    </Stack.Navigator>
  )
}
