import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginUsuario} from 'app/shared/models/security/login-usuario';
import {AuthService} from '../../services/security/auth.service';
import {TokenService} from '../../services/security/token.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  usuario: LoginUsuario;
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];
  username: string;
  errorMsg = '';

  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router) {
  }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
      this.username = this.tokenService.getUserName();

      new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  onLogin(): void {
    this.usuario = new LoginUsuario(this.form.nombreUsuario, this.form.password);

    this.authService.login(this.usuario).subscribe(data => {
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);

        this.isLogged = true;
        this.isLoginFail = false;
        this.roles = this.tokenService.getAuthorities();
        this.username = this.tokenService.getUserName();

        swal.fire('Login correcto!', 'Bienvenido de nuevo! Disfrute de nuestra página.', 'success').then(result => {
          if (result.isConfirmed || result.isDenied || result.isDismissed) {
            window.location.href = '/home';
          }
        });
      },
      () => {
        this.isLogged = false;
        this.isLoginFail = true;
        swal.fire('Error al iniciar sesión!', 'Usuario o contraseña incorrectos.', 'error');
        this.errorMsg = 'Usuario o contraseña incorrectos.';
      }
    );
  }

}
