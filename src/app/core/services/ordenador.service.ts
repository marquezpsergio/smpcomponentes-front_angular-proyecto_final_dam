import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Ordenador} from '../../shared/models/ordenador';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrdenadorService {

  private urlEndPoint = 'http://localhost:8080/api/ordenadores';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getOrdenadores(): Observable<Ordenador[]> {
    return this.http.get<Ordenador[]>(this.urlEndPoint).pipe(
      map(response => response as Ordenador[])
    );
  }

  getOrdenador(id): Observable<Ordenador> {
    return this.http.get<Ordenador>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        this.router.navigate(['/ordenadores']);
        swal.fire('ERROR!', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  getOrdenadorByUsuario(usuarioId): Observable<Ordenador[]> {
    return this.http.get<Ordenador[]>(`${this.urlEndPoint}/usuarios/${usuarioId}`).pipe(
      map(response => response as Ordenador[])
    );
  }

  create(ordenador: Ordenador): Observable<Ordenador> {
    return this.http.post<Ordenador>(this.urlEndPoint, ordenador, {headers: this.httpHeaders}).pipe(
      map((response) => response as Ordenador),
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        swal.fire('ERROR!', e.error.message, 'error');
        return throwError(e);
      })
    );
  }
}
