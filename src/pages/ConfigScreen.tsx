import { Alert, Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import LoginTheme from "../theme/LoginTheme";
import { Background } from "../components/Background";
import ConfigTheme from "../theme/ConfigTheme";
import { useForm } from "../hooks/useFom";
import { useContext} from "react";
import IpContext from "../context/IpContext";
import { StackScreenProps } from "@react-navigation/stack";
interface Props extends StackScreenProps<any,  any>{}
export const ConfigScreen = ({navigation}:Props) =>{

  const  {saveIp, ip, status} = useContext(IpContext);

  const {ipServer, onChange} = useForm({
    ipServer: ip?ip:'',
  });

  const onSaveIp = () =>{
    let regexIp = new RegExp("^(http(s?):\/\/)+((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)+(\\/[a-zA-Z0-9\\_\\-\\s\\.\\/\\?\\%\\#\\&\\=]*)$")
    if (ipServer.length > 0 && regexIp.test(ipServer.toString())) {
      Keyboard.dismiss();
      saveIp(ipServer);
    } else {
      Alert.alert('Error en Registrar','La ip ingresada no es valida');
    }
  };

  return <>
    <Background/>
    <View style={LoginTheme.formContainer}>
      <Text style={LoginTheme.title}>Configurando la IP de TILK</Text>
      <Text style={ConfigTheme.txtConf}>Tienes que configurar la ip del servidor
      donde esta la base de datos de TILK. Sino tienes idea cual es la ip,
      puedes abrir Tilk en la computadora de la empresa, y presiona el primer
      icono rosado, se mostrará un cuadro. Copia exactamente la ip del campo
      'Dirección del Servidor'. Recuerda incluir http://. Sino logras encontrar
      la ip del servidor comunicate con soporte.</Text>

      <Text style={LoginTheme.label}>IP del Servidor</Text>
      <TextInput
        selectionColor="white"
        style={LoginTheme.inputField}
        placeholderTextColor={"#FFFF"}
        underlineColorAndroid="white"
        placeholder="Ingrese la ip"
        value={ipServer.toString()}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(value => onChange(value, 'ipServer'))}
      />

      <View style={LoginTheme.btnContainerLogin}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={LoginTheme.btn}
          onPress={onSaveIp}
        >
          <Text style={LoginTheme.textBtn}>Registrar IP</Text>
        </TouchableOpacity>
      </View>

      {
        (status === 'isIp')?<>
          <View style={LoginTheme.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=> navigation.replace('LoginScreen') }
            >
              <Text style={LoginTheme.textBtn}>Volver al Inicio</Text>
            </TouchableOpacity>
          </View>
        </> : null
      }
    </View>
  </>
}
