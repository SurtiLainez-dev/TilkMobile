import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivityIndicator, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { CobrosInicioScreen } from "../../pages/caja/CobroInicioScreen";
import { CobroPagosScreen } from "../../pages/caja/CobroPagosScreen";
import { CobrosCobroScreen } from "../../pages/caja/CobrosCobroScreen";
import { useContext } from "react";
import VentaContext from "../../context/tilk/VentaContext";
import { PagosCuentaScreen } from "../../pages/cuentas/PagosCuentaScreen";
import { InicioCuentaScreen } from "../../pages/cuentas/InicioCuentaScreen";
import { ArticulosCuentaScreen } from "../../pages/cuentas/ArticulosCuentaScreen";

const Tab = createBottomTabNavigator();
export const TabCobro = () =>{
  const {statusVenta, venta} = useContext(VentaContext);

  if (statusVenta || !venta){
    return (
      <View>
        <ActivityIndicator color="#28B463" size={100}/>
      </View>
    );
  };

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
            case 'CobrosInicioScreen':
              iconName = 'apps-outline'
              break;
            case 'CobrosPagosScreen':
              iconName = 'list-outline';
              break;
            case 'CobrosCobroScreen':
              iconName = 'cash-outline';
              break;
            case 'CobrosArticulosScreen':
              iconName = 'grid-outline';
              break;
          }
          return <Text style={{color:"#5D6D7E"}}><Icon name={iconName} size={20} color="#5D6D7E"/></Text>
        }
      })}
    >
      <Tab.Screen name="CobrosInicioScreen"   options={{title:'Detalles'}} component={InicioCuentaScreen}/>
      <Tab.Screen name="CobrosArticulosScreen"  options={{title:'Articulo'}}   component={ArticulosCuentaScreen}/>
      <Tab.Screen name="CobrosPagosScreen" options={{title:'Pagos'}} component={PagosCuentaScreen}/>
      <Tab.Screen name="CobrosCobroScreen" options={{title:'Cobro'}} component={CobrosCobroScreen}/>
    </Tab.Navigator>
  )
}
