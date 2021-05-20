import {Component, OnInit} from '@angular/core';
import {OrdenadorService} from '../../services/ordenador.service';
import {LineaOrdenadorService} from '../../services/lineaOrdenador.service';
import {Ordenador} from '../../../shared/models/ordenador';
import {LineaOrdenador} from '../../../shared/models/lineaOrdenador';
import {Componente} from '../../../shared/models/componente';
import {ComponenteService} from '../../services/componente.service';

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

  public checkForm(): void {
    const formValido = false;
  }

  public createOrdenador(): void {
    this.ordenadorService.create(this.ordenador).subscribe(
      ordenador => {
        this.createLineaOrdenador(ordenador);
      }
    );
  }

  public createLineaOrdenador(ordenadorCreado: Ordenador): void {
    this.placaBaseLinea.ordenador = ordenadorCreado;
    this.lineaOrdenadorService.create(this.placaBaseLinea).subscribe();

    this.procesadorLinea.ordenador = ordenadorCreado;
    this.lineaOrdenadorService.create(this.procesadorLinea).subscribe();

    this.discoDuroLinea.ordenador = ordenadorCreado;
    this.lineaOrdenadorService.create(this.discoDuroLinea).subscribe();

    this.discoDuroSSDLinea.ordenador = ordenadorCreado;
    this.lineaOrdenadorService.create(this.discoDuroSSDLinea).subscribe();

    this.tarjetaGraficaLinea.ordenador = ordenadorCreado;
    this.lineaOrdenadorService.create(this.tarjetaGraficaLinea).subscribe();

    this.memoriaRamLinea.ordenador = ordenadorCreado;
    this.lineaOrdenadorService.create(this.memoriaRamLinea).subscribe();

    this.grabadoraDVDLinea.ordenador = ordenadorCreado;
    this.lineaOrdenadorService.create(this.grabadoraDVDLinea).subscribe();

    this.tarjetaSonidoLinea.ordenador = ordenadorCreado;
    this.lineaOrdenadorService.create(this.tarjetaSonidoLinea).subscribe();

    this.cajaTorreLinea.ordenador = ordenadorCreado;
    this.lineaOrdenadorService.create(this.cajaTorreLinea).subscribe();

    this.ventilacionLinea.ordenador = ordenadorCreado;
    this.lineaOrdenadorService.create(this.ventilacionLinea).subscribe();

    this.fuenteAlimLinea.ordenador = ordenadorCreado;
    this.lineaOrdenadorService.create(this.fuenteAlimLinea).subscribe();
  }

}
