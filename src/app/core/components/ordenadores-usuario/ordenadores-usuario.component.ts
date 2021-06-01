import {Component, OnInit} from '@angular/core';
import {OrdenadorService} from '../../services/ordenador.service';
import {Ordenador} from '../../../shared/models/ordenador';
import {Usuario} from '../../../shared/models/usuario';
import {UsuarioService} from '../../services/usuario.service';
import {TokenService} from '../../services/security/token.service';

@Component({
  selector: 'app-ordenadores-usuario',
  templateUrl: './ordenadores-usuario.component.html',
  styleUrls: ['./ordenadores-usuario.component.css']
})
export class OrdenadoresUsuarioComponent implements OnInit {

  ordenadores: Ordenador[];
  usuario: Usuario;

  constructor(private ordenadorService: OrdenadorService,
              private usuarioService: UsuarioService,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.usuarioService.getUsuarioByNombreUsuario(this.tokenService.getUserName()).subscribe(
      user => this.usuario = user,
      () => null,
      () => this.ordenadorService.getOrdenadorByUsuario(this.usuario.id).subscribe(
        ordenadores => this.ordenadores = ordenadores)
    );
  }

}
