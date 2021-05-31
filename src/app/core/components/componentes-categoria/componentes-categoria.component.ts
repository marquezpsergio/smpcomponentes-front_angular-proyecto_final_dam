import {Component, OnInit} from '@angular/core';
import {ComponenteService} from 'app/core/services/componente.service';
import {Componente} from 'app/shared/models/componente';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriaService} from '../../services/categoria.service';
import {Categoria} from '../../../shared/models/categoria';
import swal from 'sweetalert2';
import {TokenService} from '../../services/security/token.service';

@Component({
  selector: 'app-componentes-categoria',
  templateUrl: './componentes-categoria.component.html',
  styleUrls: ['./componentes-categoria.component.css']
})
export class ComponentesCategoriaComponent implements OnInit {

  componentes: Componente[];
  categoria: Categoria;
  authority: string;

  constructor(private componenteService: ComponenteService,
              private categoriaService: CategoriaService,
              private router: Router,
              private activatedRouter: ActivatedRoute,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.tokenService.getAuthorities().every(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.authority = 'admin';
      } else {
        this.authority = 'user';
      }
    });

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

  delete(componente: Componente): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Eliminar componente?',
      text: `¿Está seguro de que desea eliminar el componente ${componente.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.componenteService.delete(componente.id).subscribe(
          () => {
            this.componentes = this.componentes.filter(comp => comp !== comp);
            swalWithBootstrapButtons.fire(
              'Componente Eliminado!',
              `El componente ${componente.nombre} eliminado con éxito.`,
              'success'
            );
          }
        );
      }
    });
  }

}
