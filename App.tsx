import 'react-native-gesture-handler';
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NavigationMain } from "./src/components/Navegation/NavegationMain";
import { IpProvider } from "./src/context/IpContext";
import { AuthProvider } from "./src/context/AuthContext";
import { VentaProvider } from "./src/context/tilk/VentaContext";
import { CajasProvider } from "./src/context/CajasContext";


const IpState = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return (
    <IpProvider>
      {children}
    </IpProvider>
  )
}
const AuthState = ({children}: {children: JSX.Element | JSX.Element[]}) =>{
  return(
    <AuthProvider>{children}</AuthProvider>
  )
}
const VentaState = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return (
    <VentaProvider>
      {children}
    </VentaProvider>
  )
}
const CajasState = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return (
    <CajasProvider>
      {children}
    </CajasProvider>
  )
}
export const App = () => {

  return(
    <SafeAreaView style={ { flex: 1} }>
      <NavigationContainer>
        <IpState>
          <VentaState>
            <AuthState>
              <CajasState>
                <NavigationMain/>
              </CajasState>
            </AuthState>
          </VentaState>
        </IpState>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
