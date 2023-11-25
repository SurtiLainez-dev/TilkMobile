import { Sucursal, User } from "./UserInterface";

export interface DataPortafolios {
  portafolios: Portafolio[];
}

export interface Portafolio {
  id:                      number;
  sucursal_id:             number;
  user_id:                 number;
  nombre:                  string;
  codigo:                  string;
  total_ingresos:          number;
  valor_cuotas:            number;
  cant_cuentas:            number;
  normalidad:              number;
  saldo_cumplimiento:      number;
  historial:               string;
  reporte:                 string;
  gerencial:               number;
  segmentos:               null;
  fecha_cierre:            Date;
  ultima_fecha_revision:   Date;
  created_at:              Date;
  updated_at:              Date;
  total_corriente:         number;
  saldo_proyeccion:        number;
  proyeccion_normalidad:   number;
  valor_cuotas_proyeccion: number;
  sucursal:                Sucursal;
  user:                    User;
}

export interface DataPortafolio {
  portafolio: Portafolio;
  avances:    Avance[];
}

export interface Avance {
  id:                number;
  cob_segmento_id:   number;
  total:             number;
  cob_portafolio_id: number;
  created_at:        Date;
  updated_at:        Date;
  cob_segmento:      CobSegmento;
}

export interface CobSegmento {
  id:          number;
  nombre:      string;
  alias:       string;
  inicio:      number;
  final:       number;
  color:       string;
  explicacion: string;
  funciones:   string;
  created_at:  Date;
  updated_at:  Date;
}

export interface DataGestiones {
  gestiones: Gestione[];
}

export interface Gestione {
  id:                    number;
  tipo_venta:            number;
  cod:                   string;
  cliente_id:            number;
  colaborador_id:        number;
  total:                 number;
  saldo_actual:          number;
  estado:                number;
  num_cuotas:            number;
  is_aceptado:           number;
  tasa_mora:             number;
  finalizacion_garantia: null;
  estado_garantia:       number;
  created_at:            Date;
  updated_at:            Date;
  sucursal_id:           number;
  facturada:             number;
  descuento:             number;
  is_segunda:            number;
  comentarios:           null | string;
  estado_articulo:       number;
  cob_segmento_id:       number;
  cob_portafolio_id:     number;
  archivos_gestion:      null;
  gestiones:             null | string;
  proxima_gestion:       Date | null;
  pagando:               number;
  saldo_actual_cap:      number;
  revision_documentos:   number;
  usuarios:              null;
  is_combo:              number | null;
  combo_id:              null;
  total_abonado_capital: number;
  total_abonado:         number;
  mora:                  number;
  cuota:                 number;
  forma_pago:            number;
  fecha_prima:           Date | null;
  fecha_vencimiento:     Date | null;
  prima:                 number;
  dias_mora:             number;
  saldo_financiar:       number;
  venta_financiera:      number;
  cliente:               ClienteAll;
  cob_segmento:          CobSegmento;
}

export interface ClienteAll {
  id:               number;
  nombres:          string;
  apellidos:        string;
  identidad:        string;
  rtn:              null | string;
  detalles:         null | string;
  archivos:         null | string;
  fecha_nacimiento: Date | null;
  sexo:             number;
  email:            null | string;
  telefonos:        string;
  nacionalidad:     string | null;
  salario:          number | null;
  empresa_trabaja:  null | string;
  is_trabaja:       number | null;
  is_casa:          number | null;
  created_at:       Date;
  updated_at:       Date;
  porcentaje_datos: null;
  direcciones:      string;
  notas:            null | string;
}

export interface Gesion{
  user: String;
  comentario: String;
  fecha_guardado: String;
  forma_contacto: String;
  fecha_gestionado: String;
  resultado_gestion: String;
  fecha_recordatorio: String;
  colaborador_responsable: String;
}





