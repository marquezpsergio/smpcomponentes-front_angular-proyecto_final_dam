import {Component, OnInit} from '@angular/core';
import {OrdenadorService} from '../../services/ordenador.service';
import {LineaOrdenadorService} from '../../services/lineaOrdenador.service';
import {Ordenador} from '../../../shared/models/ordenador';
import {LineaOrdenador} from '../../../shared/models/lineaOrdenador';
import {Componente} from '../../../shared/models/componente';
import {ComponenteService} from '../../services/componente.service';
import swal from 'sweetalert2';

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
  public discoDuroSSDComps: Componente[];
  public tarjetaGraficaComps: Componente[];
  public memoriaRamComps: Componente[];
  public grabadoraDVDComps: Componente[];
  public tarjetaSonidoComps: Componente[];
  public cajaTorreComps: Componente[];
  public ventilacionComps: Componente[];
  public fuenteAlimComps: Componente[];
  public placaBaseLinea = new LineaOrdenador();
  public procesadorLinea = new LineaOrdenador();
  public discoDuroLinea = new LineaOrdenador();
  public discoDuroSSDLinea = new LineaOrdenador();
  public tarjetaGraficaLinea = new LineaOrdenador();
  public memoriaRamLinea = new LineaOrdenador();
  public grabadoraDVDLinea = new LineaOrdenador();
  public tarjetaSonidoLinea = new LineaOrdenador();
  public cajaTorreLinea = new LineaOrdenador();
  public ventilacionLinea = new LineaOrdenador();
  public fuenteAlimLinea = new LineaOrdenador();
  private ordenador: Ordenador = new Ordenador();

  errores: string[];

  constructor(private ordenadorService: OrdenadorService,
              private lineaOrdenadorService: LineaOrdenadorService,
              private componenteService: ComponenteService) {
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
    this.componenteService.getComponentesByCategoria(4).subscribe(
      componentes => this.discoDuroSSDComps = componentes);
    this.componenteService.getComponentesByCategoria(5).subscribe(
      componentes => this.tarjetaGraficaComps = componentes);
    this.componenteService.getComponentesByCategoria(6).subscribe(
      componentes => this.memoriaRamComps = componentes);
    this.componenteService.getComponentesByCategoria(7).subscribe(
      componentes => this.grabadoraDVDComps = componentes);
    this.componenteService.getComponentesByCategoria(8).subscribe(
      componentes => this.tarjetaSonidoComps = componentes);
    this.componenteService.getComponentesByCategoria(9).subscribe(
      componentes => this.cajaTorreComps = componentes);
    this.componenteService.getComponentesByCategoria(10).subscribe(
      componentes => this.ventilacionComps = componentes);
    this.componenteService.getComponentesByCategoria(11).subscribe(
      componentes => this.fuenteAlimComps = componentes);
  }

  public create(): void {
    this.ordenadorService.create(this.ordenador).subscribe(
      ordenador => {
        this.createLineaOrdenador(ordenador);
        swal.fire('Nuevo ordenador', 'Ordenador creado con éxito', 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

  public createLineaOrdenador(ordenadorCreado: Ordenador): void {
    this.placaBaseLinea.ordenador = ordenadorCreado;
    this.placaBaseLinea.precioVenta = this.placaBaseComps.find(comp => comp.id === this.placaBaseLinea.componente.id).precio;
    this.lineaOrdenadorService.create(this.placaBaseLinea).subscribe(() => {
    }, err => {
      this.errores = err.error.errors as string[];
    });

    this.procesadorLinea.ordenador = ordenadorCreado;
    this.procesadorLinea.precioVenta = this.procesadorComps.find(comp => comp.id === this.procesadorLinea.componente.id).precio;
    this.lineaOrdenadorService.create(this.procesadorLinea).subscribe(() => {
    }, err => {
      this.errores = err.error.errors as string[];
    });

    this.discoDuroLinea.ordenador = ordenadorCreado;
    this.discoDuroLinea.precioVenta = this.discoDuroComps.find(comp => comp.id === this.discoDuroLinea.componente.id).precio;
    this.lineaOrdenadorService.create(this.discoDuroLinea).subscribe(() => {
    }, err => {
      this.errores = err.error.errors as string[];
    });

    this.discoDuroSSDLinea.ordenador = ordenadorCreado;
    this.discoDuroSSDLinea.precioVenta = this.discoDuroSSDComps.find(comp => comp.id === this.discoDuroSSDLinea.componente.id).precio;
    this.lineaOrdenadorService.create(this.discoDuroSSDLinea).subscribe(() => {
    }, err => {
      this.errores = err.error.errors as string[];
    });

    this.tarjetaGraficaLinea.ordenador = ordenadorCreado;
    this.tarjetaGraficaLinea.precioVenta = this.tarjetaGraficaComps.find(comp => comp.id === this.tarjetaGraficaLinea.componente.id).precio;
    this.lineaOrdenadorService.create(this.tarjetaGraficaLinea).subscribe(() => {
    }, err => {
      this.errores = err.error.errors as string[];
    });

    this.memoriaRamLinea.ordenador = ordenadorCreado;
    this.memoriaRamLinea.precioVenta = this.memoriaRamComps.find(comp => comp.id === this.memoriaRamLinea.componente.id).precio;
    this.lineaOrdenadorService.create(this.memoriaRamLinea).subscribe(() => {
    }, err => {
      this.errores = err.error.errors as string[];
    });

    this.grabadoraDVDLinea.ordenador = ordenadorCreado;
    this.grabadoraDVDLinea.precioVenta = this.grabadoraDVDComps.find(comp => comp.id === this.grabadoraDVDLinea.componente.id).precio;
    this.lineaOrdenadorService.create(this.grabadoraDVDLinea).subscribe(() => {
    }, err => {
      this.errores = err.error.errors as string[];
    });

    this.tarjetaSonidoLinea.ordenador = ordenadorCreado;
    this.tarjetaSonidoLinea.precioVenta = this.tarjetaSonidoComps.find(comp => comp.id === this.tarjetaSonidoLinea.componente.id).precio;
    this.lineaOrdenadorService.create(this.tarjetaSonidoLinea).subscribe(() => {
    }, err => {
      this.errores = err.error.errors as string[];
    });

    this.cajaTorreLinea.ordenador = ordenadorCreado;
    this.cajaTorreLinea.precioVenta = this.cajaTorreComps.find(comp => comp.id === this.cajaTorreLinea.componente.id).precio;
    this.lineaOrdenadorService.create(this.cajaTorreLinea).subscribe(() => {
    }, err => {
      this.errores = err.error.errors as string[];
    });

    this.ventilacionLinea.ordenador = ordenadorCreado;
    this.ventilacionLinea.precioVenta = this.ventilacionComps.find(comp => comp.id === this.ventilacionLinea.componente.id).precio;
    this.lineaOrdenadorService.create(this.ventilacionLinea).subscribe(() => {
    }, err => {
      this.errores = err.error.errors as string[];
    });

    this.fuenteAlimLinea.ordenador = ordenadorCreado;
    this.fuenteAlimLinea.precioVenta = this.fuenteAlimComps.find(comp => comp.id === this.fuenteAlimLinea.componente.id).precio;
    this.lineaOrdenadorService.create(this.fuenteAlimLinea).subscribe(() => {
    }, err => {
      this.errores = err.error.errors as string[];
    });
  }

}
