import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../../core/services/security/token.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  titulo = 'SMPComponentes';

  isLogin = false;
  roles: string[];
  authority: string;

  constructor(private tokenService: TokenService) {
  }

  ngOnInit(): void {
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
    swal.fire('¡Hasta pronto!', 'La sesión ha sido cerrada correctamente.', 'success').then(result => {
      if (result.isConfirmed || result.isDenied || result.isDismissed) {
        window.location.href = '/home';
      }
    });
  }

}
