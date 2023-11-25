import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TodasGestiones } from "../../pages/portafolios/TodasGestiones";
import { GestionesHoy } from "../../pages/portafolios/GestionesHoy";
import { InicioPortafolio } from "../../pages/portafolios/InicioPortafolio";
import { OpcionesGestiones } from "../../pages/portafolios/OpcionesGestiones";
import { ActivityIndicator, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useContext, useEffect } from "react";
import VentaContext from "../../context/tilk/VentaContext";

const Tab = createBottomTabNavigator();

export const TabPortafolio = () =>{
  const {portafolioId, getPortafolio, loadPortafolio, portafolio} = useContext(VentaContext);
  useEffect(()=>{
    if (portafolio && portafolioId !== portafolio.portafolio.id){
      getPortafolio();
    }else if (!portafolio){
      getPortafolio();
    }
  },[portafolioId]);

  if (loadPortafolio || !portafolio){
    return (
      <View>
        <ActivityIndicator color="#28B463" size={100}/>
      </View>
    );
  }

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
            case 'InicioPortafolioScreen':
              iconName = 'apps-outline'
              break;
            case 'TodasGestionesPortafolioScreen':
              iconName = 'list-outline';
              break;
            case 'GestionesHoyPortafolioScreen':
              iconName = 'today-outline';
              break;
            case 'OpcionesPortafolioScreen':
              iconName = 'settings-outline'
              break
          }
          return <Text style={{color:"#5D6D7E"}}><Icon name={iconName} size={20} color="#5D6D7E"/></Text>
        }
      })}
    >
      <Tab.Screen name="InicioPortafolioScreen"         options={{title:'Inicio'}}  component={InicioPortafolio}/>
      <Tab.Screen name="TodasGestionesPortafolioScreen" options={{title:'Gestiones'}}  component={TodasGestiones}/>
      <Tab.Screen name="GestionesHoyPortafolioScreen"   options={{title:'Gestiones Hoy'}}  component={GestionesHoy}/>
      <Tab.Screen name="OpcionesPortafolioScreen"       options={{title:'Opciones'}}  component={OpcionesGestiones}/>
    </Tab.Navigator>
  )
}
