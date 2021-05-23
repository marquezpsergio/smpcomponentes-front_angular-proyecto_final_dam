import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Usuario} from '../../shared/models/usuario';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint = 'http://localhost:8080/api/usuarios';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application-json'});

  constructor(private http: HttpClient) {
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlEndPoint).pipe(
      map(response => response as Usuario[])
    );
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlEndPoint, usuario, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        swal.fire('ERROR!', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
