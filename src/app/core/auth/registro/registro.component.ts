import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/security/auth.service';
import {NuevoUsuario} from '../../../shared/models/security/nuevo-usuario';
import {Router} from '@angular/router';

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
              private router: Router) {
  }

  ngOnInit() {
  }

  onRegister() {
    this.usuario = new NuevoUsuario(this.form.nombreUsuario, this.form.email, this.form.password);
    this.authService.registro(this.usuario).subscribe(() => {
        this.isRegister = true;
        this.isRegisterFail = false;

        new Promise(resolve => setTimeout(resolve, 3000)).then(() => {
          this.router.navigate(['/home']);
        });
      },
      (err: any) => {
        this.isRegister = false;
        this.isRegisterFail = true;
        this.errorMsg = err.error.message;
      }
    );
  }

}
