import { FlatList, ScrollView, Text, View } from "react-native";
import { HeaderDetalleGestion } from "../../../components/HeaderDetalleGestion";
import { useContext, useEffect } from "react";
import VentaContext from "../../../context/tilk/VentaContext";
import { ListaDetallesNum } from "../../../components/ListaDetallesNum";
import { ListaDetallesEstado } from "../../../components/ListaDetallesEstado";
import { ListaPagos } from "../../../components/ListaPagos";

export const DetalleGestion = () =>{
  const {gestion, venta, pagosAtrasados} = useContext(VentaContext);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderDetalleGestion titulo={gestion?.cliente.nombres+' '+gestion?.cliente.apellidos}
                            segmento={gestion?.cob_segmento.nombre}
                            color={gestion?.cob_segmento.color}
                            codigo={'Datos generales de la gestión # '+gestion?.cod}/>
      <View style={{flex: 1}}>
        <ScrollView>
          <ListaDetallesNum titulo="Saldo Inicial de la Cuenta" total={venta?.total}/>
          <ListaDetallesNum titulo="Saldo de la Cuenta" total={venta?.saldo_actual}/>
          <ListaDetallesNum titulo="Saldo sin Mora" total={venta?.saldo_actual_cap}/>
          <ListaDetallesNum titulo="Mora" total={venta?.mora}/>
          <ListaDetallesNum titulo="Saldo Atrasado" total={venta?.pagando}/>
          <ListaDetallesNum titulo="Saldo Abonado" total={venta?.total_abonado}/>
        </ScrollView>
      </View>
      <View style={{marginTop: 4, marginHorizontal: 10, borderTopWidth: 1, borderTopColor: '#ABB2B9', flex: 1}}>
        <Text style={{fontSize: 16}}>Pagos Atrasados</Text>
        <FlatList
                  data={pagosAtrasados}
                  renderItem={({item})=> <ListaPagos pago={item}/>
                  }
                  keyExtractor={(item)=> item.id.toString()}
        />
      </View>
    </View>
  );
};
