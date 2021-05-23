import {Injectable} from '@angular/core';
import {Componente} from '../../shared/models/componente';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService {

  private urlEndPoint = 'http://localhost:8080/api/componentes';
  private urlEndPointCategoria = 'http://localhost:8080/api/componentes/categoria';
  private urlEndPointFabricante = 'http://localhost:8080/api/componentes/fabricante';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getComponentes(): Observable<Componente[]> {
    return this.http.get<Componente[]>(this.urlEndPoint).pipe(
      map(response => response as Componente[])
    );
  }

  getComponente(id): Observable<Componente> {
    return this.http.get<Componente>(`${this.urlEndPoint}/${id}`);
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
    return this.http.post<Componente>(this.urlEndPoint, componente, {headers: this.httpHeaders});
  }

  update(componente: Componente): Observable<Componente> {
    return this.http.put<Componente>(`${this.urlEndPoint}/${componente.id}`, componente, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<Componente> {
    return this.http.delete<Componente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
