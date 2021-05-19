import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Componente} from '../../shared/models/componente';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService {

  private urlEndPoint = 'http://localhost:8080/api/componentes';
  private urlEndPointCategoria = 'http://localhost:8080/api/componentes/categoria';
  private urlEndPointFabricante = 'http://localhost:8080/api/componentes/fabricante';

  constructor(private http: HttpClient) {
  }

  getComponentes(): Observable<Componente[]> {
    return this.http.get<Componente[]>(this.urlEndPoint).pipe(
      map(response => response as Componente[])
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
}
