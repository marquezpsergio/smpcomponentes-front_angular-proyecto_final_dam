import {Component, OnInit} from '@angular/core';
import {Componente} from '../../../shared/models/componente';
import {ComponenteService} from '../../services/componente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.css']
})
export class ComponentesComponent implements OnInit {

  componentes: Componente[];

  constructor(private componenteService: ComponenteService) {
  }

  ngOnInit(): void {
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
      title: '¿Está seguro?',
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
