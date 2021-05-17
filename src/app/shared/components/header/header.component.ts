import {Component, OnInit} from '@angular/core';
import {Categoria} from '../../models/categoria';
import {CategoriaService} from '../../../core/services/categoria.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  titulo = 'SMPComponentes';
  categorias: Categoria[];

  constructor(private categoriaService: CategoriaService) {
  }

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(
      categorias => this.categorias = categorias
    );
  }

}
