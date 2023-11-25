import { useEffect, useState } from "react";
import { DataAccount, Venta } from "../interfaces/Accountsnterface";
import tilkApi from "../api/tilkApi";
export const useAccount = () =>{
  const [isLoading, setLoading] = useState(false);
  const [cuentas, setCuentas]   = useState<Venta[]>([]);
  const [allCuentas, setAllCuentas]   = useState<Venta[]>([]);

  const getCuentas = () =>{
    setLoading(true);
    tilkApi.get<DataAccount>('/cuentas/ventas/pendientes').then(res=>{
      setCuentas(res.data.ventas);
      setAllCuentas(res.data.ventas);
      setLoading(false);
    });
  };

  const onCuentas = (data:Venta[]) => {
    setCuentas(data);
  }

  useEffect(()=>{
    getCuentas();
  },[]);

  return{
    cuentas,
    isLoading,
    allCuentas,
    onCuentas,
    getCuentas
  }
}
