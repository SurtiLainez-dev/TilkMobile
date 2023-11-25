import { FlatList, ScrollView, Text, View } from "react-native";
import { HeaderDetalleGestion } from "../../../components/HeaderDetalleGestion";
import { useContext } from "react";
import VentaContext from "../../../context/tilk/VentaContext";
import { Gesion } from "../../../interfaces/PortafolioInterface";
import { ListaTelefonos } from "../../../components/ListaTelefonos";
import { ListaGestionesHechas } from "../../../components/ListaGestionesHechas";

export const GestionesGestion = () =>{
  const {gestion, venta} = useContext(VentaContext);
  const gestiones:Gesion | [] = (venta?.gestiones.length === 0)?[]:JSON.parse(venta?.gestiones);
  const telefonos:Gesion | [] = (venta?.cliente.telefonos.length === 0)?[]:JSON.parse(venta?.cliente.telefonos);
  return(
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderDetalleGestion titulo={gestion?.cliente.nombres+' '+gestion?.cliente.apellidos}
                            segmento={gestion?.cob_segmento.nombre}
                            color={gestion?.cob_segmento.color}
                            codigo={'Gestiones de la gestión # '+gestion?.cod}/>

      <View style={{flex: 1, marginTop: 4, marginHorizontal: 10}}>
        <Text style={{fontSize: 16}}>Telefonos</Text>
        <FlatList
          data={telefonos}
          renderItem={({item})=>
              <ListaTelefonos telefono={item}/>
            }
          />
      </View>
      <View style={{flex: 1, marginTop: 4, marginHorizontal: 10, borderTopWidth: 1, borderTopColor: '#ABB2B9'}}>
        <Text style={{fontSize: 16}}>Gestiones</Text>
        <FlatList
          data={gestiones}
          renderItem={({item})=>
            <ListaGestionesHechas gestion={item}/>
          }
        />
      </View>
    </View>
  )
}
