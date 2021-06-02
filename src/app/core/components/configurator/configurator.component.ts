import {Component, OnInit} from '@angular/core';
import {OrdenadorService} from '../../services/ordenador.service';
import {LineaOrdenadorService} from '../../services/lineaOrdenador.service';
import {Ordenador} from '../../../shared/models/ordenador';
import {LineaOrdenador} from '../../../shared/models/lineaOrdenador';
import {Componente} from '../../../shared/models/componente';
import {ComponenteService} from '../../services/componente.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {UsuarioService} from '../../services/usuario.service';
import {TokenService} from '../../services/security/token.service';

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
  public ordenador: Ordenador = new Ordenador();

  isLogin: boolean;
  errores: string[];

  constructor(private ordenadorService: OrdenadorService,
              private lineaOrdenadorService: LineaOrdenadorService,
              private componenteService: ComponenteService,
              private usuarioService: UsuarioService,
              private tokenService: TokenService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogin = true;
      this.usuarioService.getUsuarioByNombreUsuario(this.tokenService.getUserName()).subscribe(user => this.ordenador.usuario = user);
    }

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
    this.ordenador.precioTotal =
      this.placaBaseLinea.precioVenta =
        this.procesadorLinea.precioVenta =
          this.discoDuroLinea.precioVenta =
            this.tarjetaGraficaLinea.precioVenta =
              this.memoriaRamLinea.precioVenta =
                this.cajaTorreLinea.precioVenta =
                  this.ventilacionLinea.precioVenta =
                    this.fuenteAlimLinea.precioVenta = 0;
  }

  placaBaseChange(value: string): void {
    if (value && value.length > 0) {
      this.componenteService.getComponente(value).subscribe((comp: Componente) => {
        this.placaBaseLinea.componente = comp;
        this.placaBaseLinea.precioVenta = comp.precio;
        this.calcularPrecio();
      });
    }
  }

  procesadorChange(value: string): void {
    if (value && value.length > 0) {
      this.componenteService.getComponente(value).subscribe((comp: Componente) => {
        this.procesadorLinea.componente = comp;
        this.procesadorLinea.precioVenta = comp.precio;
        this.calcularPrecio();
      });
    }
  }

  discoDuroChange(value: string): void {
    if (value && value.length > 0) {
      this.componenteService.getComponente(value).subscribe((comp: Componente) => {
        this.discoDuroLinea.componente = comp;
        this.discoDuroLinea.precioVenta = comp.precio;
        this.calcularPrecio();
      });
    }
  }

  tarjetaGraficaChange(value: string): void {
    if (value && value.length > 0) {
      this.componenteService.getComponente(value).subscribe((comp: Componente) => {
        this.tarjetaGraficaLinea.componente = comp;
        this.tarjetaGraficaLinea.precioVenta = comp.precio;
        this.calcularPrecio();
      });
    }
  }

  memoriaRAMChange(value: string): void {
    if (value && value.length > 0) {
      this.componenteService.getComponente(value).subscribe((comp: Componente) => {
        this.memoriaRamLinea.componente = comp;
        this.memoriaRamLinea.precioVenta = comp.precio;
        this.calcularPrecio();
      });
    }
  }

  cajaTorreChange(value: string): void {
    if (value && value.length > 0) {
      this.componenteService.getComponente(value).subscribe((comp: Componente) => {
        this.cajaTorreLinea.componente = comp;
        this.cajaTorreLinea.precioVenta = comp.precio;
        this.calcularPrecio();
      });
    }
  }

  ventilacionChange(value: string): void {
    if (value && value.length > 0) {
      this.componenteService.getComponente(value).subscribe((comp: Componente) => {
        this.ventilacionLinea.componente = comp;
        this.ventilacionLinea.precioVenta = comp.precio;
        this.calcularPrecio();
      });
    }
  }

  fuenteAlimChange(value: string): void {
    if (value && value.length > 0) {
      this.componenteService.getComponente(value).subscribe((comp: Componente) => {
        this.fuenteAlimLinea.componente = comp;
        this.fuenteAlimLinea.precioVenta = comp.precio;
        this.calcularPrecio();
      });
    }
  }

  public create(): void {
    this.calcularPrecio();
    this.ordenador.lineasOrdenador = [this.placaBaseLinea,
      this.procesadorLinea,
      this.discoDuroLinea,
      this.tarjetaGraficaLinea,
      this.memoriaRamLinea,
      this.cajaTorreLinea,
      this.fuenteAlimLinea];

    if (this.ventilacionLinea.id > 0 && this.ventilacionLinea !== undefined && this.ventilacionLinea !== null) {
      this.ordenador.lineasOrdenador.push(this.ventilacionLinea);
    }

    this.ordenadorService.create(this.ordenador).subscribe(
      (ordenador: Ordenador) => {
        this.ordenador = ordenador;
        this.router.navigate(['/ordenadores']);
        swal.fire('¡Ordenador configurado!', 'Su ordenador ha sido creado con éxito.', 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

  private calcularPrecio(): void {
    this.ordenador.precioTotal = this.placaBaseLinea.precioVenta +
      this.procesadorLinea.precioVenta +
      this.discoDuroLinea.precioVenta +
      this.tarjetaGraficaLinea.precioVenta +
      this.memoriaRamLinea.precioVenta +
      this.cajaTorreLinea.precioVenta +
      this.ventilacionLinea.precioVenta +
      this.fuenteAlimLinea.precioVenta;
  }

}
