import { Injectable, Injector } from '@angular/core';
import { Usuario } from "./usuario.model";

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseResourceService<Usuario> {

  constructor(protected injector: Injector) {
    super('http://localhost:8000/api/prototipo01/usuarios', injector, Usuario.fromJson);
  }

  create(resource: Usuario): Observable<Usuario> {
    console.log(resource)
    return this.http.post(this.apiPath, resource).pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)
    )
}

}
