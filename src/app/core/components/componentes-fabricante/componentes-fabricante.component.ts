import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Componente} from 'app/shared/models/componente';
import {Fabricante} from '../../../shared/models/fabricante';
import {FabricanteService} from '../../services/fabricante.service';
import {ComponenteService} from 'app/core/services/componente.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {TokenService} from '../../services/security/token.service';

@Component({
  selector: 'app-componentes-categoria',
  templateUrl: './componentes-fabricante.component.html',
  styleUrls: ['./componentes-fabricante.component.css']
})
export class ComponentesFabricanteComponent implements OnInit, AfterViewChecked {

  componentes: Componente[];
  pageOfItems: Array<any>;
  fabricante: Fabricante;
  authority: string;

  constructor(private componenteService: ComponenteService,
              private fabricanteService: FabricanteService,
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
        this.componenteService.getComponentesByFabricante(id).subscribe(
          componentes => this.componentes = componentes
        );
        this.fabricanteService.getFabricanteById(id).subscribe(
          fabricante => this.fabricante = fabricante
        );
      }
    });
  }

  ngAfterViewChecked(): void {
    document.getElementsByClassName('pagination')[0].classList.add('justify-content-center');
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

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

}
