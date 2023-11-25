export interface DataClients {
  clientes: Cliente[];
}

export interface Cliente {
  nombres:   string;
  apellidos: null | string;
  identidad: string;
  sexo:      number;
  email:     null | string;
  id:        number;
}
