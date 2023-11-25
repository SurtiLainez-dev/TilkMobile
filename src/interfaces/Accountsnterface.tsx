import { Colaborador, Sucursal } from "./UserInterface";

export interface DataAccount {
  ventas: Venta[] | [];
}

export interface Venta {
  nombres:      string;
  apellidos:    string;
  id:           number;
  cod:          string;
  total:        number;
  saldo_actual: number;
  estado:       number;
  is_aceptado:  number;
  identidad:    string;
}

export interface DataCuenta {
  venta: VentaAll;
}

export interface VentaAll {
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
  estado_cuenta:         string | null;
  tasa_mora:             number;
  finalizacion_garantia: null;
  estado_garantia:       number;
  created_at:            Date;
  updated_at:            Date;
  sucursal_id:           number;
  facturada:             number;
  descuento:             number;
  is_segunda:            number;
  comentarios:           string;
  estado_articulo:       number;
  cob_segmento_id:       number;
  cob_portafolio_id:     number;
  archivos_gestion:      null;
  gestiones:             string;
  proxima_gestion:       Date;
  pagando:               number;
  saldo_actual_cap:      number;
  revision_documentos:   number;
  usuarios:              null;
  is_combo:              null;
  combo_id:              null;
  total_abonado_capital: number;
  total_abonado:         number;
  mora:                  number;
  cuota:                 number;
  forma_pago:            number;
  fecha_prima:           Date;
  fecha_vencimiento:     Date;
  prima:                 number;
  dias_mora:             number;
  saldo_financiar:       number;
  venta_financiera:      number;
  colaborador:           Colaborador;
  recibos:               Recibo[];
  facturas_contados:     FacturasContado[];
  cliente:               ClienteAll;
  pagos_extras_ventas:   any[];
  pagos_contratos:       PagosContrato[];
  cob_segmento:          CobSegmento;
  sucursal:              Sucursal;
}

export interface ClienteAll {
  id:               number;
  nombres:          string;
  apellidos:        string;
  identidad:        string;
  rtn:              string;
  detalles:         string;
  archivos:         string;
  fecha_nacimiento: Date;
  sexo:             number;
  email:            string;
  telefonos:        string;
  nacionalidad:     string;
  salario:          number;
  empresa_trabaja:  string;
  is_trabaja:       number;
  is_casa:          number;
  created_at:       Date;
  updated_at:       Date;
  porcentaje_datos: null;
  direcciones:      string;
  notas:            string;
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

export interface FacturasContado {
  id:                   number;
  venta_id:             number;
  articulo_id:          number;
  cantidad:             number;
  precio:               number;
  total:                number;
  remision_articulo_id: number;
  is_remision:          number;
  created_at:           Date;
  updated_at:           Date;
  estado_articulo_id:   null;
  combo_id:             null;
  articulo:             Articulo;
  remision_articulo:    RemisionArticulo;
}

export interface Articulo {
  id:                      number;
  modelo:                  string;
  referencia_fabricante:   null;
  codigo_barras:           null;
  codigo_proveedor:        string;
  nombre_articulo:         string;
  descripcion_corta:       string;
  sub_familia_articulo_id: number;
  codigo_sistema:          string;
  user_id:                 number;
  is_compuesto:            number;
  is_motocicleta:          number;
  marca_id:                number;
  created_at:              Date;
  updated_at:              Date;
  precio_costo:            number;
  stock_maximo:            number;
  stock_minimo:            number;
  marca:                   Marca;
  articulo_compuestos:     ArticuloCompuesto[];
}

export interface ArticuloCompuesto {
  id:                    number;
  detalle:               string;
  cantidad:              number;
  detalle_cantidad:      string;
  codigo:                string;
  articulo_id:           number;
  created_at:            Date;
  updated_at:            Date;
  inventario_compuestos: InventarioCompuesto[];
}

export interface InventarioCompuesto {
  id:                    number;
  articulo_compuesto_id: number;
  sucursal_id:           number;
  stock_nuevo:           number;
  stock_reingreso:       number;
  created_at:            Date;
  updated_at:            Date;
}

export interface Marca {
  id:           number;
  nombre:       string;
  proveedor_id: number;
  created_at:   Date;
  updated_at:   Date;
  proveedor:    Proveedor;
}

export interface Proveedor {
  id:            number;
  nombre:        string;
  rtn:           string;
  pais:          string;
  codigo_postal: string;
  direccion:     string;
  logo:          null;
  email:         string;
  telefono:      string;
  swift:         null;
  created_at:    Date;
  updated_at:    Date;
}

export interface RemisionArticulo {
  id:                 number;
  estado_articulo_id: number;
  precio_inicial:     number;
  precio_actual:      number;
  serie_sistema:      string;
  serie_fabricante:   string;
  sucursal_id:        number;
  articulo_id:        number;
  created_at:         Date;
  updated_at:         Date;
  color:              string;
  margen_anual:       null;
  comentarios:        null;
  motocicleta:        null;
}

export interface PagosContrato {
  id:              number;
  venta_id:        number;
  pago_inicial:    number;
  total_pago:      number;
  total_abonado:   number;
  saldo_actual:    number;
  detalle:         string;
  is_mora:         number;
  mora:            number;
  inicio_mora:     Date | null;
  capital:         number;
  interes:         number;
  fecha_pago:      Date;
  is_cobro_mora:   number;
  estado:          number;
  created_at:      Date;
  updated_at:      Date;
  saldo_antes:     number;
  saldo_despues:   number;
  saldo_capital:   number;
  saldo_intereses: number;
  dias_mora:       number | null;
  dias_gracia:     number;
  saldo_cap:       number;
}

export interface Recibo {
  id:                 number;
  total_interes:      number;
  total_capital:      number;
  total_mora:         number;
  codigo:             string;
  referencia:         null;
  fecha:              Date | String;
  hora:               string;
  observacion:        string;
  total:              number;
  user_id:            number;
  created_at:         Date;
  updated_at:         Date;
  venta_id:           number;
  pago:               string;
  sucursal_id:        number;
  caja_id:            number;
  file:               null | string;
  saldo_actual_venta: number;
  saldo_nuevo:        number;
}
