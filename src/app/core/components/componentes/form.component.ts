import {Component, OnInit} from '@angular/core';
import {Categoria} from '../../../shared/models/categoria';
import {Fabricante} from '../../../shared/models/fabricante';
import {Componente} from '../../../shared/models/componente';
import {CategoriaService} from '../../services/categoria.service';
import {FabricanteService} from '../../services/fabricante.service';
import {ComponenteService} from '../../services/componente.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  titulo = 'Crear Componente';
  componente = new Componente();
  categorias: Categoria[];
  fabricantes: Fabricante[];

  errores: string[];

  constructor(private categoriaService: CategoriaService,
              private fabricanteService: FabricanteService,
              private componenteService: ComponenteService,
              private router: Router,
              private activadedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(
      categorias => this.categorias = categorias
    );

    this.fabricanteService.getFabricantes().subscribe(
      fabricantes => this.fabricantes = fabricantes
    );

    this.cargarComponente();
  }

  public cargarComponente(): void {
    this.activadedRoute.params.subscribe(params => {
        const id = params.id;
        if (id) {
          this.componenteService.getComponente(id).subscribe(
            componente => this.componente = componente
          );
        }
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

  catChange(value: string): void {
    if (value && value.length > 0) {
      this.categoriaService.getCategoriaById(value).subscribe((cat: Categoria) => this.componente.categoria = cat);
    }
  }

  fabChange(value: string): void {
    if (value && value.length > 0) {
      this.fabricanteService.getFabricanteById(value).subscribe((fab: Fabricante) => this.componente.fabricante = fab);
    }
  }

  public create(): void {
    this.componenteService.create(this.componente).subscribe(
      () => {
        this.router.navigate(['/componentes']);
        swal.fire('Nuevo ordenador', 'Ordenador creado con éxito', 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

  public update(): void {
    this.componenteService.update(this.componente).subscribe(
      componente => {
        this.router.navigate(['/componentes']);
        swal.fire('Componnete Actualizado', `Componente ${componente.nombre} actualizado con éxito!`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

}
