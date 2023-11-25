import { DataCuenta, VentaAll } from "../interfaces/Accountsnterface";
import { useEffect, useState } from "react";
import tilkApi from "../api/tilkApi";

interface DetailsVenta{
  venta: VentaAll | null,
  isLoading: Boolean
}

export const useVenta= (ventaId: Number | null) =>{
  const [state, setVenta] = useState<DetailsVenta>({
    isLoading: true,
    venta: null,
  });

  const getVenta = async ()=>{
    if (ventaId){
      setVenta({
        isLoading: true,
        venta: null,
      });
      let res = await tilkApi.get<DataCuenta>('/cuentas/ventas/'+ventaId);
      setVenta({
        venta: res.data.venta,
        isLoading: false,
      });
    }
  };

  useEffect(()=>{
    getVenta();
  },[ventaId]);

  return{
    ...state
  }
};
