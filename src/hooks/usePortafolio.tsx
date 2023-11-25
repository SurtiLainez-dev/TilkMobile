import { DataPortafolios, Portafolio } from "../interfaces/PortafolioInterface";
import { useContext, useEffect, useState } from "react";
import tilkApi from "../api/tilkApi";
import AuthContext from "../context/AuthContext";

export const usePortafolio = () =>{
  const {user } = useContext(AuthContext);
  const [loading,        setLoading]        = useState(false);
  const [portafolios,    setPortafolios]    = useState<Portafolio[]>([]);
  const [loadingAll,     setLoadingAll]     = useState(false);
  const [allPortafolios, setAllPortafolios] = useState<Portafolio[]>([]);

  const getPortafolios = () =>{
    setLoading(true);
    tilkApi.get<DataPortafolios>('/cobros/mi_portafolios').then(res=>{
      setPortafolios(res.data.portafolios);
      setLoading(false);
    }).catch(()=>{
      setLoading(false);
    });
  };
  const getAllPortafolios = () =>{
    setLoadingAll(true);
    tilkApi.get<DataPortafolios>('cobros/portafolios').then(res=>{
      setAllPortafolios(res.data.portafolios);
      setLoadingAll(false);
    }).catch(()=>{
      setLoadingAll(false);
    })
  };

  useEffect(()=>{
    getPortafolios();
    if (user?.tipo_usuario_id === 1){
      getAllPortafolios();
    }
  },[]);

  return {
    portafolios,
    loading,
    loadingAll,
    allPortafolios,
  };
};
