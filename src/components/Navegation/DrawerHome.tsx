import { DrawerContentScrollView, DrawerItem,
  createDrawerNavigator, DrawerContentComponentProps
} from "@react-navigation/drawer";
import { CuentasScreen } from "../../pages/CuentasScreen";
import { HomeScreen } from "../../pages/HomeScreen";
import { PortafolioScreen } from "../../pages/PortafolioScreen";
import { ClietsScreen } from "../../pages/ClietsScreen";
import { ReciboScreen } from "../../pages/ReciboScreen";
import { BackHandler, Text, TouchableOpacity, View } from "react-native";
import menuStyles from "../../theme/MenuTheme";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { TabCuentas } from "./TabCuentas";
import { TabPortafolio } from "./TabPortafolio";
import { TabDetalleGestion } from "./TabDetalleGestion";
import { AllPortafoliosScreen } from "../../pages/AllPortafoliosScreen";
import { CajasScreen } from "../../pages/CajasScreen";
import { TabCaja } from "./TabCaja";
import { TabCobro } from "./TabCobro";

import Icon from "react-native-vector-icons/Ionicons";
import { getHeaderTitle } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";

export type RootStackParams = {
  HomeScreen: undefined,
  CuentasScreen: undefined,
  ClientsScreen: undefined,
  PortafolioScreen: undefined,
  RecibosScreen: undefined,
  DetailsCuentaScreen: Number,
  DetailPortafolioScreen: undefined,
  VerDetallesGestion: undefined,
  AllPortafolioScreen: undefined,
  CajasScreen: undefined,
  TabCajaScreen: undefined,
  TabCobroScreen: undefined,
}
const Drawer = createDrawerNavigator<RootStackParams>();

// @ts-ignore
const Header = ({ navigation, route, options }) => {
  const title = getHeaderTitle(options, route.name);
  return (
    <View style={{backgroundColor:'white', height: 50, justifyContent:'center', shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,

      elevation: 2}}>
      <View style={{flexDirection:'row'}}>
        <View>
          <TouchableOpacity onPress={()=>navigation.openDrawer()}>
            <View>
              <Icon style={{marginLeft:20}} name="menu-outline" color="#273746" size={30}/>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{fontSize: 22, fontWeight:'bold', color:'#000', marginLeft:30}}>{title}</Text>
        </View>
      </View>
    </View>
  )
}
export const DrawerHome = () =>{
  const {drawer} = useContext(AuthContext);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: drawer,
        drawerStyle: {
          backgroundColor: 'white',
          width: '85%',
        },
        header: Header
      }}
      drawerContent={(props) => <Content {...props}/>
    }>
      <Drawer.Screen name="HomeScreen" options={{title: 'Inicio'}} component={HomeScreen}/>
      <Drawer.Screen name="CuentasScreen" options={{title: 'Cuentas'}} component={CuentasScreen}/>
      <Drawer.Screen name="PortafolioScreen" options={{title: 'Mis Portafolios'}} component={PortafolioScreen}/>
      <Drawer.Screen name="ClientsScreen" options={{title: 'Clientes'}} component={ClietsScreen}/>
      <Drawer.Screen name="RecibosScreen" options={{title: 'Recibos'}} component={ReciboScreen}/>
      <Drawer.Screen name="DetailsCuentaScreen" options={{title: 'Datos de la Cuenta'}} component={TabCuentas}/>
      <Drawer.Screen name="DetailPortafolioScreen" options={{title: 'Datos del Portafolio'}} component={TabPortafolio}/>
      <Drawer.Screen name="AllPortafolioScreen" options={{title: 'Todos los Portafolios'}} component={AllPortafoliosScreen}/>
      <Drawer.Screen name="CajasScreen" options={{title: 'Totales de Caja'}} component={CajasScreen}/>
      <Drawer.Screen name="VerDetallesGestion" options={{title: 'Datos de la Gestión'}} component={TabDetalleGestion}/>
      <Drawer.Screen name="TabCajaScreen" options={{title: 'Datos de la Gestión'}} component={TabCaja}/>
      <Drawer.Screen name="TabCobroScreen" options={{title: 'Datos de la Gestión'}} component={TabCobro}/>
    </Drawer.Navigator>
  );
}


const Content = ({navigation}:DrawerContentComponentProps) => {
  const {logOut, user} = useContext(AuthContext);
  return(
    <DrawerContentScrollView style={{backgroundColor:'#F8F9F9'}}>
      <View style={{borderBottomWidth: 1, borderBottomColor:'#566573'}}>
        <Text style={menuStyles.titulo}>TILK Mobile</Text>
        <Text style={menuStyles.subtitulo}>{user?.usuario}</Text>
      </View>
      <View style={menuStyles.menuContainer}>
        <TouchableOpacity
          onPress={()=> navigation.navigate("HomeScreen")}
          style={menuStyles.menuItemsBtn}>
          <Text style={menuStyles.menuItemsTexto}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=> navigation.navigate("ClientsScreen")}
          style={menuStyles.menuItemsBtn}>
          <Text style={menuStyles.menuItemsTexto}>Clientes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=> navigation.navigate("CuentasScreen")}
          style={menuStyles.menuItemsBtn}>
          <Text style={menuStyles.menuItemsTexto}>Cuentas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=> navigation.navigate("PortafolioScreen")}
          style={menuStyles.menuItemsBtn}>
          <Text style={menuStyles.menuItemsTexto}>Mis Portafolios</Text>
        </TouchableOpacity>
        {
          (user?.tipo_usuario_id === 1)?(
          <View>
            <TouchableOpacity
              onPress={()=> navigation.navigate("AllPortafolioScreen")}
              style={{ ...menuStyles.menuItemsBtn, width:'100%' }}>
              <Text style={menuStyles.menuItemsTexto}>Todos los Portafolios</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=> navigation.navigate("CajasScreen")}
              style={menuStyles.menuItemsBtn}>
              <Text style={menuStyles.menuItemsTexto}>Totales de las Cajas</Text>
            </TouchableOpacity>
          </View>
          ) : null
        }
        <TouchableOpacity
          onPress={()=> navigation.navigate("RecibosScreen")}
          style={menuStyles.menuItemsBtn}>
          <Text style={menuStyles.menuItemsTexto}>Hacer un Cobro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={menuStyles.menuItemsBtn}
          onPress={logOut}
        >
          <Text style={menuStyles.menuItemsTexto}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
      {/*<DrawerItem labelStyle={menuStyles.menuItemsTexto}  activeBackgroundColor="#3498DB" label="Inicio" onPress={()=>console.log("si")}/>*/}
      {/*<DrawerItem labelStyle={menuStyles.menuItemsTexto}  label="Clientes" onPress={()=>console.log("si")}/>*/}
      {/*<DrawerItem labelStyle={menuStyles.menuItemsTexto}  label="Cuentas" onPress={()=>console.log("si")}/>*/}
      {/*<DrawerItem labelStyle={menuStyles.menuItemsTexto}  label="Mis Portafolios" onPress={()=>console.log("si")}/>*/}
      {/*<DrawerItem labelStyle={menuStyles.menuItemsTexto}  label="Todos los Portafolios" onPress={()=>console.log("si")}/>*/}
      {/*<DrawerItem labelStyle={menuStyles.menuItemsTexto}  label="Totales de la Cajas" onPress={()=>console.log("si")}/>*/}
      {/*<DrawerItem labelStyle={menuStyles.menuItemsTexto}  label="Hacer un Cobro" onPress={()=>console.log("si")}/>*/}
      {/*<DrawerItem labelStyle={menuStyles.menuItemsTexto}  label="Cerrar Sesión" onPress={()=>console.log("si")}/>*/}
    </DrawerContentScrollView>
  )
}
