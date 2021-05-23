import {Injectable} from '@angular/core';
import {Componente} from '../../shared/models/componente';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService {

  private urlEndPoint = 'http://localhost:8080/api/componentes';
  private urlEndPointCategoria = 'http://localhost:8080/api/componentes/categoria';
  private urlEndPointFabricante = 'http://localhost:8080/api/componentes/fabricante';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getComponentes(): Observable<Componente[]> {
    return this.http.get<Componente[]>(this.urlEndPoint).pipe(
      map(response => response as Componente[])
    );
  }

  getComponente(id): Observable<Componente> {
    return this.http.get<Componente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        this.router.navigate(['/componentes']);
        swal.fire('ERROR!', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getComponentesByCategoria(id): Observable<Componente[]> {
    return this.http.get<Componente[]>(`${this.urlEndPointCategoria}/${id}`).pipe(
      map(response => response as Componente[])
    );
  }

  getComponentesByFabricante(id): Observable<Componente[]> {
    return this.http.get<Componente[]>(`${this.urlEndPointFabricante}/${id}`).pipe(
      map(response => response as Componente[])
    );
  }

  create(componente: Componente): Observable<Componente> {
    return this.http.post<Componente>(this.urlEndPoint, componente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        swal.fire('Error al crear el componente!', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(componente: Componente): Observable<Componente> {
    return this.http.put<Componente>(`${this.urlEndPoint}/${componente.id}`, componente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        swal.fire('Error al editar el componente!', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Componente> {
    return this.http.delete<Componente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        swal.fire('Error al eliminar el componente!', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
