import {Usuario} from './usuario';
import {LineaOrdenador} from './lineaOrdenador';

export class Ordenador {
  id: number;
  fechaCompra: string;
  precioTotal: number;
  usuario: Usuario;
  lineasOrdenador: LineaOrdenador[];
}
