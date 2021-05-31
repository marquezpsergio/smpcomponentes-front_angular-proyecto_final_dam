import {Component, OnInit} from '@angular/core';
import {Componente} from '../../../shared/models/componente';
import {ComponenteService} from '../../services/componente.service';
import swal from 'sweetalert2';
import {TokenService} from '../../services/security/token.service';

@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.css']
})
export class ComponentesComponent implements OnInit {

  componentes: Componente[];
  authority: string;

  constructor(private componenteService: ComponenteService,
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

    this.componenteService.getComponentes().subscribe(
      componentes => this.componentes = componentes
    );
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
