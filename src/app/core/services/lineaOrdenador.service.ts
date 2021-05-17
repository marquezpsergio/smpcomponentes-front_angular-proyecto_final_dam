import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LineaOrdenador} from '../../shared/models/lineaOrdenador';

@Injectable({
  providedIn: 'root'
})
export class LineaOrdenadorService {

  private urlEndPoint = 'http://localhost:8080/api/lineas-ordenadores';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient) {
  }

  getLineasOrdenadores(): Observable<LineaOrdenador[]> {
    return this.http.get<LineaOrdenador[]>(this.urlEndPoint).pipe(
      map(response => response as LineaOrdenador[])
    );
  }

  create(lineaOrdenador: LineaOrdenador): Observable<LineaOrdenador> {
    return this.http.post<LineaOrdenador>(this.urlEndPoint, lineaOrdenador, {headers: this.httpHeaders});
  }
}
