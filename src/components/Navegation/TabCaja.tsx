import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivityIndicator, BackHandler, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { CajaHomeScreen } from "../../pages/caja/CajaHomeScreen";
import { CajaCuentasScreen } from "../../pages/caja/CajaCuentasScreen";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
export const TabCaja = () =>{
  const {setDrawer} = useContext(AuthContext);
  const navegation: any = useNavigation();
  const back = () =>{
    navegation.navigate('RecibosScreen');
    setDrawer(true);
  };

  useEffect(()=>{
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      back,
    );
    return () => backHandler.remove();
  },[]);

  return(
    <Tab.Navigator
      sceneAnimationEnabled
      barStyle={{
        backgroundColor: 'white'
      }}
      screenOptions={({route})=>({
        cardStyle:{
          backgroundColor: 'white'
        },
        headerShown: false,
        tabBarActiveTintColor: '#28B463',
        tabBarLabelStyle: {
          fontSize: 15
        },
        tabBarStyle:{borderTopColor: '#28B463', elevation: 0},
        tabBarIcon: () =>{
          let iconName: String = '';
          switch ( route.name ){
            case 'InicioCajaScreen':
              iconName = 'apps-outline'
              break;
            case 'CuentasCajaScreen':
              iconName = 'list-outline';
              break;
          }
          return <Text style={{color:"#5D6D7E"}}><Icon name={iconName} size={20} color="#5D6D7E"/></Text>
        }
      })}
    >
      <Tab.Screen name="InicioCajaScreen"   options={{title:'Inicio'}} component={CajaHomeScreen}/>
      <Tab.Screen name="CuentasCajaScreen" options={{title:'Cuentas'}} component={CajaCuentasScreen}/>
    </Tab.Navigator>
  )
}
