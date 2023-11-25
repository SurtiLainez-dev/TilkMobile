import { HeaderDetalleGestion } from "../../../components/HeaderDetalleGestion";
import { useContext, useState } from "react";
import VentaContext from "../../../context/tilk/VentaContext";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useForm } from "../../../hooks/useFom";
import SelectDropdown from 'react-native-select-dropdown'
import { Colaborador } from "../../../interfaces/UserInterface";
import tilkApi from "../../../api/tilkApi";
import { useNavigation } from "@react-navigation/native";
export const NuevaGestionScreen = () =>{
  const navegation: any = useNavigation();
  const {gestion, colaboradores, venta, removeGestion, getPortafolio} = useContext(VentaContext);
  const [date, setDate] = useState(new Date());
  const fechaActual     = new Date();
  const [dateRecordatorio, setDateRecordatorio] = useState(new Date());
  const formaContacto   = [
    "Visita formal por lider del piso",
    "Visita formal por colaborador",
    "Entrega de requerimiento",
    "Llamada normal",
    "Llamada por Whatsapp",
    "Mensaje de texto",
    "Mensaje de Whatsapp",
    "Contacto por alguna red social",
    "Cliente se presentó al piso de venta",
    "Correo eléctronico",
    "Cualquier tipo de contacto al aval",
    "Cualquier tipo de contato a las referencias  ",
  ]
  const {formaCont, comentario, colaborador, exitoso,onChange} = useForm({
    formaCont: '',
    colaborador: '',
    exitoso: '',
    comentario: ''
  });
  const resExitoso = ['Si','No','Promesa de Pago'];
  const [loadSaveGestion, setLoadSaveGestion] = useState(false);
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  const onChangeDateRecordatorio = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateRecordatorio(currentDate);
  };
  const minimoFecha = () =>{
    let fecha = new Date();
    fecha.setDate(fechaActual.getDate() - 4);
    return fecha;
  };
  const fechaActualMasUnDia = () =>{
    let fecha = new Date();
    return fecha.setDate(fechaActual.getDate() + 1);
  }
  const showMode = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onChangeDate,
      is24Hour: true,
      timeZoneName: 'America/Tegucigalpa',
      minimumDate: minimoFecha(),
      maximumDate: fechaActual,
      positiveButton:{label: 'Seleccionar', textColor: '#A569BD'},
      negativeButton:{label: 'Cancelar', textColor: 'red'}
    });
  };
  const showModeRecordatorio = () => {
    DateTimePickerAndroid.open({
      value: dateRecordatorio,
      onChange: onChangeDateRecordatorio,
      is24Hour: true,
      timeZoneName: 'America/Tegucigalpa',
      minimumDate: fechaActualMasUnDia(),
      positiveButton:{label: 'Seleccionar', textColor: '#A569BD'},
      negativeButton:{label: 'Cancelar', textColor: 'red'}
    });
  };
  const verificarForm = () =>{
    let errores = [];
    if (formaCont.length === 0){
      errores.push('Tienes que seleccionar una forma de contacto');
    }
    if (colaborador.length === 0){
      errores.push('Tienes que seleccionar un colaborador');
    }
    if (comentario.length <= 10){
      errores.push('Tienes que escribir un comentario mayor a 10 carácteres')
    }
    if (errores.length > 0){
      Alert.alert(
        'Error en la Validación',
        'Tienes campos vacios en el formulario'
      )
    }else {
      saveGestion();
    }
  }

  if (loadSaveGestion){
    return (
      <View>
        <ActivityIndicator color="#28B463" size={100}/>
      </View>
    );
  }
  const saveGestion = ()=>{
    setLoadSaveGestion(true);
    tilkApi.post('cobros/gestion/agregar_recordatorio',{
      venta_id: venta?.id,
      colaborador,
      fecha_gestion: date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate(),
      forma: formaCont,
      recordatorio: dateRecordatorio.getFullYear()+'-'+(dateRecordatorio.getMonth() + 1)+'-'+dateRecordatorio.getDate(),
      resultado: exitoso,
      comentario
    }).then((res)=>{
      getPortafolio();
      setLoadSaveGestion(false);
      navegation.navigate('DetailPortafolioScreen');
      removeGestion();
    }).catch(error=>{
      console.log(error)
      Alert.alert('Error al registrar','No se pudo registrar la gestión, verifica que tengas acceso a internet.')
    })
  }

  return(
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderDetalleGestion titulo={gestion?.cliente.nombres+' '+gestion?.cliente.apellidos}
                            segmento={gestion?.cob_segmento.nombre}
                            color={gestion?.cob_segmento.color}
                            codigo={'Creando Nueva Gestión # '+gestion?.cod}/>

      <ScrollView>
        <View style={{marginHorizontal: 15, marginVertical: 20}}>
          <Text style={styles.titleInput}>Fecha de Gestión</Text>
          <TouchableOpacity onPress={showMode}>
            <View style={{borderBottomColor: '#2ECC71', height: 35, borderBottomWidth:1}}>
              <Text style={{color:'#000', padding: 4, fontSize: 15}}>
                {date.getDate()} de {(date.getMonth() + 1)} de {date.getFullYear()}
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.titleInput}>Seleccionar Forma de Contacto</Text>
          <SelectDropdown
            data={formaContacto}
            buttonStyle={styles.dropdown3BtnStyle}
            renderCustomizedButtonChild={(selectedItem) => {
              return (
                <View style={styles.dropdown3BtnChildStyle}>
                  <Text style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem : '-'}</Text>
                </View>
              );
            }}
            dropdownStyle={styles.dropdown3DropdownStyle}
            rowStyle={styles.dropdown3RowStyle}
            onSelect={(selectedItem) => {
              onChange(selectedItem, 'formaCont');
            }}
            renderCustomizedRowChild={(item) => {
              return (
                <View style={styles.dropdown3RowChildStyle}>
                  <Text style={styles.dropdown3RowTxt}>{item}</Text>
                </View>
              );
            }}
          />
          <Text style={styles.titleInput}>Colaborador Responsable</Text>
          <SelectDropdown
            data={colaboradores}
            buttonStyle={styles.dropdown3BtnStyle}
            renderCustomizedButtonChild={(selectedItem: Colaborador) => {
              return (
                <View style={styles.dropdown3BtnChildStyle}>
                  <Text style={styles.dropdown3BtnTxt}>{
                    selectedItem ? selectedItem.nombres+' '+selectedItem.apellidos : '-'}
                  </Text>
                </View>
              );
            }}
            dropdownStyle={styles.dropdown3DropdownStyle}
            rowStyle={styles.dropdown3RowStyle}
            onSelect={(selectedItem:Colaborador) => {
              onChange(selectedItem.nombres+' '+selectedItem.apellidos, 'colaborador');
            }}
            renderCustomizedRowChild={(item:Colaborador) => {
              return (
                <View style={styles.dropdown3RowChildStyle}>
                  <Text style={styles.dropdown3RowTxt}>{item.nombres+' '+item.apellidos}</Text>
                </View>
              );
            }}
          />
          <Text style={styles.titleInput}>Agregar Recordatorio</Text>
          <TouchableOpacity onPress={showModeRecordatorio}>
            <View style={{borderBottomColor: '#2ECC71', height: 35, borderBottomWidth:1}}>
              <Text style={{color:'#000', padding: 4, fontSize: 15}}>
                {dateRecordatorio.getDate()} de {(dateRecordatorio.getMonth() + 1)} de {dateRecordatorio.getFullYear()}
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.titleInput}>¿Gestión Exitosa?</Text>
          <SelectDropdown
            data={resExitoso}
            buttonStyle={styles.dropdown3BtnStyle}
            renderCustomizedButtonChild={(selectedItem) => {
              return (
                <View style={styles.dropdown3BtnChildStyle}>
                  <Text style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem : 'No'}</Text>
                </View>
              );
            }}
            dropdownStyle={styles.dropdown3DropdownStyle}
            rowStyle={styles.dropdown3RowStyle}
            onSelect={(selectedItem) => {
              onChange(selectedItem, 'exitoso');
            }}
            renderCustomizedRowChild={(item) => {
              return (
                <View style={styles.dropdown3RowChildStyle}>
                  <Text style={styles.dropdown3RowTxt}>{item}</Text>
                </View>
              );
            }}
          />
          <Text style={styles.titleInput}>Comentario de la Gestión</Text>
          <TextInput
            value={comentario}
            onChangeText={(value)=> onChange(value, 'comentario')}
            multiline
            numberOfLines = {3}
            placeholder="Comentario de la gestion"
            style={{
              borderBottomColor:'#2ECC71',
              borderBottomWidth:1,
              height: 100,
              fontSize: 15
          }}/>

          <View style={{borderTopWidth: 1, borderTopColor:'#EAECEE',
            marginTop: 40, flexDirection:'row',
            justifyContent:'flex-end'}}>
            <TouchableOpacity
              onPress={()=>verificarForm()}
              style={{
              backgroundColor: '#2ECC71',
              height: 40,
              width: 150,
              borderRadius: 100,
              marginTop: 10,
              justifyContent:'center',
            }}
              activeOpacity={0.8}
            >
              <Text
                style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold'
                }}
              >
                Registrar Gestión
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  titleInput:{
    color:'#000',
    fontWeight:'bold',
    fontSize: 16,
    marginTop: 10
  },
  dropdown3BtnStyle: {
    width: '100%',
    height: 35,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderColor:  '#2ECC71',
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdown3BtnImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3BtnTxt: {
    fontSize: 15,
    color:'#000',
    padding: 4,
  },
  dropdown3DropdownStyle: {backgroundColor: 'slategray'},
  dropdown3RowStyle: {
    backgroundColor: '#5D6D7E',
    borderBottomColor: '#ABB2B9',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
    height: 40
  },
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 12,
  },
})
