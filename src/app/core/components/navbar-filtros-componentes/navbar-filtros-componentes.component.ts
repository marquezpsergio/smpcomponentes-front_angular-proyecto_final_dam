import {Component, OnInit} from '@angular/core';
import {Categoria} from '../../../shared/models/categoria';
import {Fabricante} from '../../../shared/models/fabricante';
import {CategoriaService} from '../../services/categoria.service';
import {FabricanteService} from '../../services/fabricante.service';

@Component({
  selector: 'app-navbar-filtros-componentes',
  templateUrl: './navbar-filtros-componentes.component.html',
  styleUrls: ['./navbar-filtros-componentes.component.css']
})
export class NavbarFiltrosComponentesComponent implements OnInit {

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
