import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtModel} from 'app/shared/models/security/jwt-model';
import {LoginUsuario} from 'app/shared/models/security/login-usuario';
import {NuevoUsuario} from 'app/shared/models/security/nuevo-usuario';
import {Observable} from 'rxjs';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = 'http://localhost:8080/api/auth/';

  constructor(private httpClient: HttpClient) {
  }

  public login(usuario: LoginUsuario): Observable<JwtModel> {
    return this.httpClient.post<JwtModel>(this.authURL + 'login', usuario, cabecera);
  }

  public registro(usuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', usuario, cabecera);
  }
}
