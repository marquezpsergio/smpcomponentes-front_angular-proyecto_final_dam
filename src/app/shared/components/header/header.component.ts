import {Component, OnInit} from '@angular/core';
import {Categoria} from '../../models/categoria';
import {Fabricante} from '../../models/fabricante';
import {CategoriaService} from '../../../core/services/categoria.service';
import {FabricanteService} from '../../../core/services/fabricante.service';
import {TokenService} from '../../../core/services/security/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  titulo = 'SMPComponentes';
  categorias: Categoria[];
  fabricantes: Fabricante[];

  isLogin = false;
  roles: string[];
  authority: string;

  constructor(private categoriaService: CategoriaService,
              private fabricanteService: FabricanteService,
              private tokenService: TokenService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(
      categorias => this.categorias = categorias
    );

    this.fabricanteService.getFabricantes().subscribe(
      fabricantes => this.fabricantes = fabricantes
    );

    if (this.tokenService.getToken()) {
      this.isLogin = true;
      this.roles = [];
      this.roles = this.tokenService.getAuthorities();
      this.roles.every(rol => {
        if (rol === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  logOut(): void {
    this.tokenService.logOut();
    this.isLogin = false;
    this.authority = '';
    this.router.navigate(['home']);
  }

}
