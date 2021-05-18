import {Categoria} from './categoria';
import {Fabricante} from './fabricante';

export class Componente {
  id: number;
  nombre: string;
  precio: number;
  unidadesDisponibles: number;
  imagen: string;
  url: string;
  categoria: Categoria;
  fabricante: Fabricante;
}
