import { Background } from "../components/Background";
import { Platform, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { Logo } from "../components/Logo";
import LoginTheme from "../theme/LoginTheme";
import { useForm } from "../hooks/useFom";
import { StackScreenProps } from "@react-navigation/stack";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import tilkApi from "../api/tilkApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props extends StackScreenProps<any,  any>{}
export const LoginScreen = ( {navigation}:Props) =>{
  const {signIn, changeLoading} = useContext(AuthContext);

  useEffect(()=>{
    readUrl();
    changeLoading(false);
  },[]);

  // useEffect(()=>{
  //   if (statusAuth === 'authenticated')
  //     navigation.replace('HomeScreen')
  // })

  const {email, password, onChange} = useForm({
    email: '',
    password: ''
  });

  const readUrl = async ():Promise<void>  =>{
    // @ts-ignore
    tilkApi.defaults.baseURL = await AsyncStorage.getItem('ip');
  };
  const onLogin = () =>{
    let emailRegex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    if (emailRegex.test(email)){
      if (password.length >= 8){
        Keyboard.dismiss();
        signIn({email, password});
      } else {
        Alert.alert('Error de Validación', 'La contraseña tiene que' +
          'ser mayor o igual a 8 carácteres')
      }
    }
    else {
      Alert.alert('Error de Validación', 'El correo ingresado, no ' +
        'cumple con los requisitos de un correo')
    }
  };

  return <>
    <Background/>

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
    >
      <View style={LoginTheme.formContainer}>
        <Logo/>

        <Text style={LoginTheme.title}>Iniciando Sesión a TILK</Text>
        <Text style={LoginTheme.label}>Correo Electronico</Text>
        <TextInput
          selectionColor="white"
          style={LoginTheme.inputField}
          keyboardType={"email-address"}
          placeholderTextColor={"#FFFF"}
          underlineColorAndroid="white"
          placeholder="Ingrese su email:"
          value={email}
          autoCapitalize="none"
          onChangeText={(value => onChange(value, 'email'))}
          autoCorrect={false}
        />

        <Text style={LoginTheme.label}>Contraseña</Text>
        <TextInput
          selectionColor="white"
          style={LoginTheme.inputField}
          placeholderTextColor={"#FFFF"}
          underlineColorAndroid="white"
          placeholder="*****"
          secureTextEntry
          value={password}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(value => onChange(value, 'password'))}
          onSubmitEditing={onLogin}
        />

        <View style={LoginTheme.btnContainerLogin}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={LoginTheme.btn}
            onPress={onLogin}
          >
            <Text style={LoginTheme.textBtn}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={LoginTheme.newUserContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=> navigation.navigate('ConfigScreen') }
          >
            <Text style={LoginTheme.textBtn}>Configuración TILK Mobile</Text>
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAvoidingView>
  </>
}
