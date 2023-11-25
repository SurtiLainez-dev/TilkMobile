import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { InicioCuentaScreen } from "../../pages/cuentas/InicioCuentaScreen";
import { PagosCuentaScreen } from "../../pages/cuentas/PagosCuentaScreen";
import { DocumentosCuentaScreen } from "../../pages/cuentas/DocumentosCuentaScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { ActivityIndicator, BackHandler, Text, View } from "react-native";
import { ArticulosCuentaScreen } from "../../pages/cuentas/ArticulosCuentaScreen";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "./DrawerHome";
import VentaContext from "../../context/tilk/VentaContext";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
export interface Props extends StackScreenProps<RootStackParams, 'DetailsCuentaScreen'>{}
export const TabCuentas = ({route}:Props) =>{
  const {statusVenta, getVenta, venta} = useContext(VentaContext);
  const {setDrawer} = useContext(AuthContext);
  const navegation: any = useNavigation();
  const back = () =>{
    navegation.navigate('CuentasScreen');
    setDrawer(true);
  };

  useEffect(()=>{
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      back,
    );
    return () => backHandler.remove();
  },[]);

  useEffect(()=>{
    cargarVenta();
  },[route.params]);

  const cargarVenta = async () =>{
    getVenta(route.params);
  }

  if (statusVenta || !venta){
    return (
      <View>
        <ActivityIndicator color="#28B463" size={100}/>
      </View>
    );
  }

  return (
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
            case 'InicioCuentaScreen':
              iconName = 'apps-outline'
              break;
            case 'ArticulosCuentaScreen':
              iconName = 'grid-outline';
              break;
            case 'PagosCuentaScreen':
              iconName = 'list-outline';
              break;
            case 'DocumentosCuentaScreen':
              iconName = 'document-text-outline'
              break
          }
          return <Text style={{color:"#5D6D7E"}}><Icon name={iconName} size={20} color="#5D6D7E"/></Text>
        }
      })}
    >
      <Tab.Screen name="InicioCuentaScreen"     options={{title:'Inicio'}}     component={InicioCuentaScreen}/>
      <Tab.Screen name="ArticulosCuentaScreen"  options={{title:'Articulo'}}   component={ArticulosCuentaScreen}/>
      <Tab.Screen name="PagosCuentaScreen"      options={{title:'Pagos'}}      component={PagosCuentaScreen}/>
      <Tab.Screen name="DocumentosCuentaScreen" options={{title:'Documentos'}} component={DocumentosCuentaScreen}/>
    </Tab.Navigator>
  );
};
