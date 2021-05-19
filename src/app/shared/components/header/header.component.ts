import {Component, OnInit} from '@angular/core';
import {Categoria} from '../../models/categoria';
import {Fabricante} from '../../models/fabricante';
import {CategoriaService} from '../../../core/services/categoria.service';
import {FabricanteService} from '../../../core/services/fabricante.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  titulo = 'SMPComponentes';
  categorias: Categoria[];
  fabricantes: Fabricante[];

  constructor(private categoriaService: CategoriaService,
              private fabricanteService: FabricanteService) {
  }

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(
      categorias => this.categorias = categorias
    );

    this.fabricanteService.getFabricantes().subscribe(
      fabricantes => this.fabricantes = fabricantes
    );
  }

}
