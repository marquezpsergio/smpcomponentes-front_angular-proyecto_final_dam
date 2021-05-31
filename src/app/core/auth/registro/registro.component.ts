import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/security/auth.service';
import {NuevoUsuario} from '../../../shared/models/security/nuevo-usuario';
import swal from 'sweetalert2';
import {TokenService} from '../../services/security/token.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form: any = {};
  isRegister = false;
  isRegisterFail = false;
  errorMsg = '';
  private usuario: any = {};

  constructor(private authService: AuthService,
              private tokenService: TokenService) {
  }

  ngOnInit() {
  }

  onRegister() {
    this.usuario = new NuevoUsuario(this.form.nombreUsuario, this.form.email, this.form.password);
    this.authService.registro(this.usuario).subscribe(() => {
        this.isRegister = true;
        this.isRegisterFail = false;

        swal.fire('Usuario registrado', 'Su usuario ha sido registrado correctamente', 'success');

        this.authService.login(this.usuario).subscribe(data => {
          this.tokenService.setToken(data.token);
          this.tokenService.setUserName(data.nombreUsuario);
          this.tokenService.setAuthorities(data.authorities);
        });

        new Promise(resolve => setTimeout(resolve, 3000)).then(() => {
          window.location.href = '/home';
        });
      },
      (err: any) => {
        this.isRegister = false;
        this.isRegisterFail = true;
        swal.fire('Error al crear su usuario!', err.error.mensaje, 'error');
        this.errorMsg = err.error.mensaje;
      }
    );

  }

}
