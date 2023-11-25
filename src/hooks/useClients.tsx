import { Cliente, DataClients } from "../interfaces/ClientsInterface";
import { useEffect, useState } from "react";
import tilkApi from "../api/tilkApi";
import { Venta } from "../interfaces/Accountsnterface";



export const useClient = () => {
  const [isLoadig, setLoading] = useState(false);
  const [clients, setClients]  = useState<Cliente[]>([]);
  const [allClients, setAllClients]  = useState<Cliente[]>([]);

  const getClients = () =>{
    setLoading(true);
    tilkApi.get<DataClients>('/clientes').then(res=>{
      setClients(res.data.clientes);
      setAllClients(res.data.clientes);
      setLoading(false);
    }).catch(()=>{
      setLoading(false);
    });
  };
  useEffect(()=>{
    getClients();
  },[]);


  const onClients = (data:Cliente[]) =>{
    setClients(data);
  }

  return {
    clients,
    isLoadig,
    allClients,
    onClients
  };
};
