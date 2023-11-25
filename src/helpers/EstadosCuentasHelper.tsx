export const getEstadoCuentas = (estado: Number) =>{
  let color = '';
  let estadoCuenta = '';

  if (estado === 1) {
    estadoCuenta = 'Al día';
    color        = '#3498DB'
  }
  else if (estado === 2) {
    estadoCuenta = 'Mora';
    color        =  '#E74C3C'
  }
  else if (estado === 3) {
    estadoCuenta = 'Cancelado';
    color        = '#28B463'
  }

  return [color, estadoCuenta];
}
export const getTipoCuenta = (estado: Number): String =>{
  if (estado === 1)
    return 'Contado';
  else
    return 'Credito';
};
export const getTipoPortafolio = (estado: Number|undefined): String[]=>{
  if (estado === 1) {
    return ['Gerencial','#28B463'];
  } else {
    return ['Normal','#E74C3C'];
  }
}
export const getCambioEfectivoCaja = (abono:Number, efectivo: Number): Number=>{
  if (efectivo <= 0){
    return 0;
  }else if (efectivo > 0 && efectivo < abono){
    return 0;
  }else{
    // @ts-ignore
    return (efectivo - abono);
  }
}
