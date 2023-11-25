export interface DataAuth {
  success:  Success;
  user:     User;
  inicios:  number;
  permisos: Permiso[];
  impuesto: number;
}

export interface Permiso {
  num: number;
  mod: number;
}

export interface Success {
  token: string;
}

export interface User {
  id:                number;
  usuario:           string;
  colaborador_id:    number;
  email:             string;
  email_verified_at: null;
  tipo_usuario_id:   number;
  estado:            number;
  datos_empresa_id:  number;
  created_at:        null;
  updated_at:        null;
  password_email:    null;
  user_email:        null;
  colaborador:       Colaborador | null;
}

export interface Colaborador {
  id:                    number;
  nombres:               string;
  apellidos:             string;
  email:                 string;
  telefono:              string;
  estado:                number;
  puesto_colaborador_id: number;
  sucursal_id:           number;
  created_at:            null;
  updated_at:            Date;
  identidad:             string;
  foto_perfil:           string;
  codigo:                string;
  sucursal:              Sucursal;
  usuarios?:             User
}

export interface Sucursal {
  id:                 number;
  nombre:             string;
  abreviatura:        string;
  email:              string;
  telefono:           string;
  direccion_completa: string;
  ciudade_id:         number;
  created_at:         null;
  updated_at:         null;
  isContable:         number;
  cod:                number;
}

export interface LoginData{
  email: String;
  password: String;
}

export interface DataColaboradores2{
  colaboradores: Colaborador[]
}
