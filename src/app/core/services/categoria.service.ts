import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Categoria} from '../../shared/models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlEndPoint = 'http://localhost:8080/api/categorias';

  constructor(private http: HttpClient) {
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlEndPoint).pipe(
      map(response => response as Categoria[])
    );
  }

  getCategoriaById(id): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.urlEndPoint}/${id}`).pipe(
      map(response => response as Categoria)
    );
  }
}
