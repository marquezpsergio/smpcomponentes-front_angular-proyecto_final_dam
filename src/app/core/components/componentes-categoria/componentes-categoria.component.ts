import {Component, OnInit} from '@angular/core';
import {ComponenteService} from 'app/core/services/componente.service';
import {Componente} from 'app/shared/models/componente';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriaService} from '../../services/categoria.service';
import {Categoria} from '../../../shared/models/categoria';

@Component({
  selector: 'app-componentes-categoria',
  templateUrl: './componentes-categoria.component.html',
  styleUrls: ['./componentes-categoria.component.css']
})
export class ComponentesCategoriaComponent implements OnInit {

  componentes: Componente[];
  categoria: Categoria;

  constructor(private componenteService: ComponenteService,
              private categoriaService: CategoriaService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.componenteService.getComponentesByCategoria(id).subscribe(
          componentes => this.componentes = componentes
        );
        this.categoriaService.getCategoriaById(id).subscribe(
          categoria => this.categoria = categoria
        );
      }
    });
  }

}
