import { Venta } from "../interfaces/Accountsnterface";
import { Cliente } from "../interfaces/ClientsInterface";
export const dataResultsFilter = (texto:String,data:[] | Venta[] | Cliente[]) =>{
  if (texto && texto.length > 0){
    let valString:String = '';
    let bandera:Boolean  = false;
    let propeties = [];
    // @ts-ignore
    let filter = data.filter((item: Object)=>{
      propeties = showProperties(item);
      for (let i = 0; i < propeties.length; i++){
        // @ts-ignore
        if (item[propeties[i]]){
          // @ts-ignore
          valString = item[propeties[i]].toString().toLowerCase();
          bandera = valString.includes(texto.toString());
          if (bandera) break;
        }
      }
      if (bandera){
        bandera = false;
        return item;
      }
    });
    return filter;
  } else {
    return data;
  }
};
const showProperties = (obj: Object): String[] =>{
  let propieties = [];
  for (let i in obj){
    if (obj.hasOwnProperty(i))
      propieties.push(i);
  }
  return propieties;
};
