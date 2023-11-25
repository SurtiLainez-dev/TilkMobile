import {
  ActivityIndicator,
  Alert,
  Button,
  Keyboard, KeyboardAvoidingView, Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import ListaTheme from "../../theme/ListaTheme";
import { useContext, useState } from "react";
import VentaContext from "../../context/tilk/VentaContext";
import { HeaderDetalleCuentas } from "../../components/HeaderDetalleCuentas";
import { useForm } from "../../hooks/useFom";
import { ListaDetallesNum } from "../../components/ListaDetallesNum";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useCajaCobros } from "../../hooks/useCajaCobros";
import CajasContext from "../../context/CajasContext";
import { PagosDistribuidosScreen } from "./PagosDistribuidosScreen";
import { getCambioEfectivoCaja } from "../../helpers/EstadosCuentasHelper";

export const CobrosCobroScreen = () =>{
  const {venta} = useContext(VentaContext);
  const {caja} = useContext(CajasContext)
  const [date, setDate] = useState(new Date());
  const {abono, referencia, observacion, efectivo, onChange} = useForm({
    abono: '0',
    referencia: '',
    observacion: '',
    efectivo: '0'
  });
  const fechaActual     = new Date();
  const {pagosDistribuidos, distribuirPagos, load, setDataRecibo, crearRecibo} = useCajaCobros();
  const [tituloBtn, setTituloBtn] = useState('');
  const [vistaPagos, setVistaPagos] = useState(false);
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  const showMode = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onChangeDate,
      is24Hour: true,
      timeZoneName: 'America/Tegucigalpa',
      minimumDate: fechaActual,
      positiveButton:{label: 'Seleccionar', textColor: '#A569BD'},
      negativeButton:{label: 'Cancelar', textColor: 'red'}
    });
  };
  const distribuirPago = () =>{
    distribuirPagos(abono).then(()=>{
      setTituloBtn('Ver Pagos Afectados');
      Keyboard.dismiss();
    });
  };
  const onClickVista = () =>{
    if (vistaPagos){
      setVistaPagos(false);
      setTituloBtn('Ver Pagos Afectados');
    }else{
      setVistaPagos(true);
      setTituloBtn('Volver al Formulario');
    }
  };

  if (load){
    return (
      <View>
        <ActivityIndicator color="#28B463" size={100}/>
      </View>
    );
  };
  const validarForm = () =>{
    if (pagosDistribuidos.length){
      if ((parseFloat(efectivo) > 0 && parseFloat(efectivo) >= parseFloat(abono)) && observacion.length > 2 && parseFloat(abono) > 0){
        if (venta?.tipo_venta == 1){
          Alert.alert('Error de Envio', 'Por el momento por este medio solo puedes hacer recibos. No se puede facturar ventas');
        }else{
          crearRecibo({
            sucursal_id: caja?.sucursal_id,
            total: parseFloat(abono),
            venta_id: venta?.id,
            observacion: observacion,
            pagos: pagosDistribuidos,
            caja_id: caja?.id,
            saldo_actual: parseFloat(venta?.saldo_actual),
            forma_pago: 3,
            referencia: referencia,
            ccBanco: null,
            recordatorio: date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate()
          });
        }
      }else{
        Alert.alert('Error al validad','Hubo un error al validar el envio, revisa lo siguiente:' +
          'que el efectivo sea mayor al saldo abonado o igual, que la observacion sea mayor a 2 caracteres, que' +
          'el abono sea mayor a 0.');
      }
    } else {
      Alert.alert('Error al validad','No hay pagos afectados');
    }
  };
  const VistaPagosAfectados = () =>{
    return(
      <>
        <PagosDistribuidosScreen pagosAfectados={pagosDistribuidos}/>
      </>
    );
  }
  // @ts-ignore
  return(
    <View style={ListaTheme.mainContainer}>
      <HeaderDetalleCuentas titulo={venta?.cliente.nombres+' '+venta?.cliente.apellidos} codigo={venta?.cod}/>


      {
        (pagosDistribuidos.length > 0)?(
          <View style={styles.containerCampo}>
            <Button title={tituloBtn} color="green" onPress={()=>onClickVista()}/>
          </View>
        ): null
      }
      {
        (!vistaPagos)?(
            <KeyboardAvoidingView
              behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
              style={{flex: 1}}>
              <View style={{marginTop: 10}}>
                <ScrollView>
                  <View style={styles.containerCampo}>
                    <Text style={styles.titleCampo}>Total a Abonar</Text>
                    <TextInput
                      onChangeText={(value)=> onChange(value, 'abono')}
                      value={abono}
                      keyboardType = 'number-pad'
                      placeholderTextColor="#AEB6BF"
                      placeholder="Total a abonar"
                      onSubmitEditing={()=>distribuirPago()}
                      style={styles.campo}/>
                  </View>
                  <View style={styles.containerCampo}>
                    <Button title="Distribuir Abono" onPress={()=>distribuirPago()}/>
                  </View>

                  <View style={styles.containerCampo}>
                    <Text style={styles.titleCampo}>Forma de Pago</Text>
                    <TextInput
                      value="Efectivo"
                      editable={false}
                      placeholderTextColor="#AEB6BF"
                      placeholder="Forma de Pago"
                      style={styles.campo}/>
                  </View>

                  <View style={styles.containerCampo}>
                    <Text style={styles.titleCampo}>Referencia del Abono</Text>
                    <TextInput
                      value={referencia}
                      onChangeText={(value)=> onChange(value, 'referencia')}
                      placeholderTextColor="#AEB6BF"
                      placeholder="Referencia del pago"
                      style={styles.campo}/>
                  </View>

                  <View style={styles.containerCampo}>
                    <Text style={styles.titleCampo}>Efectivo</Text>
                    <TextInput
                      onChangeText={(value)=> onChange(value, 'efectivo')}
                      value={efectivo}
                      keyboardType = 'number-pad'
                      placeholderTextColor="#AEB6BF"
                      placeholder="Efectivo"
                      onSubmitEditing={()=>Keyboard.dismiss()}
                      style={styles.campo}
                    />
                  </View>

                  <ListaDetallesNum titulo="Cambio" total={getCambioEfectivoCaja(parseFloat(abono), parseFloat(efectivo))}/>

                  <View style={styles.containerCampo}>
                    <Text style={styles.titleCampo}>Observacición</Text>
                    <TextInput
                      value={observacion}
                      onChangeText={(value)=> onChange(value, 'observacion')}
                      placeholderTextColor="#AEB6BF"
                      placeholder="Observacion ..."
                      style={styles.campo}/>
                  </View>

                  <View style={styles.containerCampo}>
                    <Text style={styles.titleCampo}>Fecha de Proxima Gestión</Text>
                    <TouchableOpacity onPress={showMode}>
                      <View style={styles.campo}>
                        <Text style={{color:'#000', padding: 4, fontSize: 15}}>
                          {date.getDate()} de {(date.getMonth() + 1)} de {date.getFullYear()}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={{ ...styles.containerCampo, marginVertical: 30}}>
                    <Button title="Registrar Abono" onPress={()=>validarForm()}/>
                  </View>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
        ) : <VistaPagosAfectados/>
      }
    </View>

  )
}

const styles = StyleSheet.create({
  containerCampo:{
    marginHorizontal: 15,
    marginTop: 10
  },
  titleCampo:{
    fontSize: 15,
    fontWeight: 'bold',
    color:'#000'
  },
  campo:{
    borderBottomColor:'#5499C7',
    borderBottomWidth:1,
    height: 50,
    fontSize: 15,
    color: '#000'
  }
})
