import { Sucursal, User } from "./UserInterface";

export interface DataCajas {
  cajas: Caja[];
}

export interface Caja {
  id:              number;
  sucursal_id:     number;
  user_id:         number;
  codigo:          string;
  num_caja:        number;
  estado_cierre:   number;
  total:           number;
  created_at:      Date | null;
  updated_at:      Date;
  registro:        null;
  resumen:         null;
  total_inicio:    null;
  hora_inicio:     null;
  hora_cierre:     null;
  estado:          null;
  password:        string;
  activa:          number;
  is_conta:        number;
  saldo_acumulado: number;
  sucursal:        Sucursal;
  user:            User;
}

export interface DataTotalesCajas {
  totalI: number;
  totalT: number;
  totalE: number;
}

export interface DataCajasXSucursal {
  cajas: Caja[];
}

export interface Caja {
  id:              number;
  sucursal_id:     number;
  user_id:         number;
  codigo:          string;
  num_caja:        number;
  estado_cierre:   number;
  total:           number;
  created_at:      Date;
  updated_at:      Date;
  registro:        null;
  resumen:         null;
  total_inicio:    null;
  hora_inicio:     null;
  hora_cierre:     null;
  estado:          null;
  password:        null | string;
  activa:          number;
  is_conta:        number;
  saldo_acumulado: number;
  sucursal:        Sucursal;
  user:            User;
}

export interface PagosDistribuidosInterface{
  status: Number,
  pago_id: Number,
  tipo: String,
  detalle: String,
  pendiente: Number,
  pagara: Number,
  saldo: Number,
  hay: Number
}



