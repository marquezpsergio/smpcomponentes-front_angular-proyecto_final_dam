import {Rol} from './rol';

export class Usuario {
  id: number;
  email: string;
  fechaRegistro: string;
  usuario: string;
  password: string;
  rol: Rol;
}
