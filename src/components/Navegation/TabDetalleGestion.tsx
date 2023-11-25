import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DetalleGestion } from "../../pages/portafolios/gestion/DetalleGestion";
import { GestionesGestion } from "../../pages/portafolios/gestion/GestionesGestion";
import { ActivityIndicator, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useContext } from "react";
import VentaContext from "../../context/tilk/VentaContext";
import { NuevaGestionScreen } from "../../pages/portafolios/gestion/NuevaGestionScreen";

const Tab = createBottomTabNavigator();
export const TabDetalleGestion = () =>{
  const {loadPortafolio, statusVenta} = useContext(VentaContext);

  if (loadPortafolio || statusVenta){
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
            case 'DetalleGestion':
              iconName = 'apps-outline'
              break;
            case 'GestionesGestion':
              iconName = 'list-outline';
              break;
            case 'NuevaGestionScreen':
              iconName = 'add-circle-outline';
              break;
          }
          return <Text style={{color:"#5D6D7E"}}><Icon name={iconName} size={20} color="#5D6D7E"/></Text>
        }
      })}
    >
      <Tab.Screen name="DetalleGestion"   options={{title:'Detalles'}} component={DetalleGestion}/>
      <Tab.Screen name="GestionesGestion" options={{title:'Gestiones'}} component={GestionesGestion}/>
      <Tab.Screen name="NuevaGestionScreen" options={{title:'Add Gestion'}} component={NuevaGestionScreen}/>
    </Tab.Navigator>
  )
}
