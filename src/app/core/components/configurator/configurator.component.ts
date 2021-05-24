import {Component, OnInit} from '@angular/core';
import {OrdenadorService} from '../../services/ordenador.service';
import {LineaOrdenadorService} from '../../services/lineaOrdenador.service';
import {Ordenador} from '../../../shared/models/ordenador';
import {LineaOrdenador} from '../../../shared/models/lineaOrdenador';
import {Componente} from '../../../shared/models/componente';
import {ComponenteService} from '../../services/componente.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css']
})
export class ConfiguratorComponent implements OnInit {

  public titulo = 'Configurador de PC';

  public placaBaseComps: Componente[];
  public procesadorComps: Componente[];
  public discoDuroComps: Componente[];
  public tarjetaGraficaComps: Componente[];
  public memoriaRamComps: Componente[];
  public cajaTorreComps: Componente[];
  public ventilacionComps: Componente[];
  public fuenteAlimComps: Componente[];
  public placaBaseLinea = new LineaOrdenador();
  public procesadorLinea = new LineaOrdenador();
  public discoDuroLinea = new LineaOrdenador();
  public tarjetaGraficaLinea = new LineaOrdenador();
  public memoriaRamLinea = new LineaOrdenador();
  public cajaTorreLinea = new LineaOrdenador();
  public ventilacionLinea = new LineaOrdenador();
  public fuenteAlimLinea = new LineaOrdenador();
  private ordenador: Ordenador = new Ordenador();

  errores: string[];

  constructor(private ordenadorService: OrdenadorService,
              private lineaOrdenadorService: LineaOrdenadorService,
              private componenteService: ComponenteService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.cargarForm();
  }

  public cargarForm(): void {
    this.componenteService.getComponentesByCategoria(1).subscribe(
      componentes => this.placaBaseComps = componentes);
    this.componenteService.getComponentesByCategoria(2).subscribe(
      componentes => this.procesadorComps = componentes);
    this.componenteService.getComponentesByCategoria(3).subscribe(
      componentes => this.discoDuroComps = componentes);
    this.componenteService.getComponentesByCategoria(5).subscribe(
      componentes => this.tarjetaGraficaComps = componentes);
    this.componenteService.getComponentesByCategoria(6).subscribe(
      componentes => this.memoriaRamComps = componentes);
    this.componenteService.getComponentesByCategoria(9).subscribe(
      componentes => this.cajaTorreComps = componentes);
    this.componenteService.getComponentesByCategoria(10).subscribe(
      componentes => this.ventilacionComps = componentes);
    this.componenteService.getComponentesByCategoria(11).subscribe(
      componentes => this.fuenteAlimComps = componentes);
  }

  placaBaseChange(value: string): void {
    if (value && value.length > 0) {
      this.componenteService.getComponente(value).subscribe((comp: Componente) => {
        this.placaBaseLinea.componente = comp;
        this.placaBaseLinea.precioVenta = comp.precio;
      });
    }
  }

  procesadorChange(value: string): void {
    if (value && value.length > 0) {
      this.componenteService.getComponente(value).subscribe((comp: Componente) => {
        this.procesadorLinea.componente = comp;
        this.procesadorLinea.precioVenta = comp.precio;
      });
    }
  }

  discoDuroChange(value: string): void {
    if (value && value.length > 0) {
      this.componenteService.getComponente(value).subscribe((comp: Componente) => {
        this.discoDuroLinea.componente = comp;
        this.discoDuroLinea.precioVenta = comp.precio;
      });
    }
  }

  tarjetaGraficaChange(value: string): void {
    if (value && value.length > 0) {
      this.componenteService.getComponente(value).subscribe((comp: Componente) => {
        this.tarjetaGraficaLinea.componente = comp;
        this.tarjetaGraficaLinea.precioVenta = comp.precio;
      });
    }
  }

  memoriaRAMChange(value: string): void {
    if (value && value.length > 0) {
      this.componenteService.getComponente(value).subscribe((comp: Componente) => {
        this.memoriaRamLinea.componente = comp;
        this.memoriaRamLinea.precioVenta = comp.precio;
      });
    }
  }

  cajaTorreChange(value: string): void {
    if (value && value.length > 0) {
      this.componenteService.getComponente(value).subscribe((comp: Componente) => {
        this.cajaTorreLinea.componente = comp;
        this.cajaTorreLinea.precioVenta = comp.precio;
      });
    }
  }

  ventilacionChange(value: string): void {
    if (value && value.length > 0) {
      this.componenteService.getComponente(value).subscribe((comp: Componente) => {
        this.ventilacionLinea.componente = comp;
        this.ventilacionLinea.precioVenta = comp.precio;
      });
    }
  }

  fuenteAlimChange(value: string): void {
    if (value && value.length > 0) {
      this.componenteService.getComponente(value).subscribe((comp: Componente) => {
        this.fuenteAlimLinea.componente = comp;
        this.fuenteAlimLinea.precioVenta = comp.precio;
      });
    }
  }

  public create(): void {
    this.ordenadorService.create(this.ordenador).subscribe(
      (ordenador: Ordenador) => {
        this.createLineaOrdenador(ordenador);
        swal.fire('Nuevo ordenador', 'Ordenador creado con éxito', 'success');
        this.router.navigate(['/ordenadores']);
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

  public createLineaOrdenador(ordenadorCreado: Ordenador): void {
    this.placaBaseLinea.ordenador = ordenadorCreado['ordenador'];
    this.lineaOrdenadorService.create(this.placaBaseLinea).subscribe(() => {
    }, err => {
      this.errores = err.error.errors as string[];
    });

    this.procesadorLinea.ordenador = ordenadorCreado['ordenador'];
    this.lineaOrdenadorService.create(this.procesadorLinea).subscribe(() => {
    }, err => {
      this.errores = err.error.errors as string[];
    });

    this.discoDuroLinea.ordenador = ordenadorCreado['ordenador'];
    this.lineaOrdenadorService.create(this.discoDuroLinea).subscribe(() => {
    }, err => {
      this.errores = err.error.errors as string[];
    });

    this.tarjetaGraficaLinea.ordenador = ordenadorCreado['ordenador'];
    this.lineaOrdenadorService.create(this.tarjetaGraficaLinea).subscribe(() => {
    }, err => {
      this.errores = err.error.errors as string[];
    });

    this.memoriaRamLinea.ordenador = ordenadorCreado['ordenador'];
    this.lineaOrdenadorService.create(this.memoriaRamLinea).subscribe(() => {
    }, err => {
      this.errores = err.error.errors as string[];
    });

    this.cajaTorreLinea.ordenador = ordenadorCreado['ordenador'];
    this.lineaOrdenadorService.create(this.cajaTorreLinea).subscribe(() => {
    }, err => {
      this.errores = err.error.errors as string[];
    });

    this.ventilacionLinea.ordenador = ordenadorCreado['ordenador'];
    this.lineaOrdenadorService.create(this.ventilacionLinea).subscribe(() => {
    }, err => {
      this.errores = err.error.errors as string[];
    });

    if (this.fuenteAlimLinea.componente !== undefined && this.fuenteAlimLinea.componente !== null) {
      this.fuenteAlimLinea.ordenador = ordenadorCreado['ordenador'];
      this.lineaOrdenadorService.create(this.fuenteAlimLinea).subscribe(() => {
      }, err => {
        this.errores = err.error.errors as string[];
      });
    }
  }

}
