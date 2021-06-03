import {Component, OnInit} from '@angular/core';
import {TokenService} from 'app/core/services/security/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogin: boolean;
  nombreUsuario: string;

  constructor(private tokenService: TokenService) {
  }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogin = true;
      this.nombreUsuario = this.tokenService.getUserName();
    }

    new Promise(resolve => setTimeout(resolve, 5000)).then(() => {
      document.getElementById('bienvenido_h3').style.display = 'none';
    });
  }

}
