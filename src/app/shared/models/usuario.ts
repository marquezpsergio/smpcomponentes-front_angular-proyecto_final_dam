import {Rol} from './rol';

export class Usuario {
  id: number;
  email: string;
  fechaRegistro: string;
  nombreUsuario: string;
  password: string;
  rol: Rol;
}
