import {Component, OnInit} from '@angular/core';
import {OrdenadorService} from '../../services/ordenador.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Ordenador} from '../../../shared/models/ordenador';

@Component({
  selector: 'app-ordenador-detalle',
  templateUrl: './ordenador-detalle.component.html'
})
export class OrdenadorDetalleComponent implements OnInit {

  ordenador = new Ordenador();

  errores: string[];

  constructor(private ordenadorService: OrdenadorService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
        const id = params.id;
        if (id) {
          this.ordenadorService.getOrdenador(id).subscribe(
            ordenador => {
              this.ordenador = ordenador;
            }
          );
        }
      },
      err => {
        this.errores = err.error.errors as string[];
      });
  }

}
