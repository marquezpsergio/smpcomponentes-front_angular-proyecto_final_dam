import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Componente } from '../../shared/models/componente';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService {

  private urlEndPoint: string = 'http://localhost:8080/api/componentes'

  constructor(private http: HttpClient) { }

  getComponentes(): Observable<Componente[]> {
    return this.http.get<Componente[]>(this.urlEndPoint).pipe(
      map(response => response as Componente[])
    );
  }
}
