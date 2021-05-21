import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Ordenador} from '../../shared/models/ordenador';

@Injectable({
  providedIn: 'root'
})
export class OrdenadorService {

  private urlEndPoint = 'http://localhost:8080/api/ordenadores';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application-json'});

  constructor(private http: HttpClient) {
  }

  getOrdenadores(): Observable<Ordenador[]> {
    return this.http.get<Ordenador[]>(this.urlEndPoint).pipe(
      map(response => response as Ordenador[])
    );
  }

  create(ordenador: Ordenador): Observable<Ordenador> {
    return this.http.post<Ordenador>(this.urlEndPoint, ordenador, {headers: this.httpHeaders});
  }
}