import {Rol} from '../rol';

export class NuevoUsuario {
  nombreUsuario: string;
  email: string;
  rol: Rol;
  password: string;

  constructor(nombreUsuario: string, email: string, password: string) {
    this.nombreUsuario = nombreUsuario;
    this.email = email;
    this.password = password;
    this.rol = new Rol();
  }
}
