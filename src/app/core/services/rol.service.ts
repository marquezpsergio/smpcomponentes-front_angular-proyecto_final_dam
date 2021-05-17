import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Rol} from '../../shared/models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private urlEndPoint = 'http://localhost:8080/api/roles';

  constructor(private http: HttpClient) {
  }

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.urlEndPoint).pipe(
      map(response => response as Rol[])
    );
  }
}
