import { Injectable, Injector } from '@angular/core';
import { Usuario } from "./usuario.model";


import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {AuthenticationService} from "../../../authentication.service";
<<<<<<< HEAD
import { HttpErrorResponse } from '@angular/common/http';
=======
>>>>>>> 0554b3279e65ae1c366a8eaa24b050bc476bcb24

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseResourceService<Usuario> {

  constructor(protected injector: Injector, authenticationService: AuthenticationService) {
    super('http://localhost:8000/api/prototipo01/usuarios', injector, Usuario.fromJson, authenticationService);
  }

  create(resource: Usuario): Observable<Usuario> {
    return this.http.post(this.apiPath, resource).pipe(
<<<<<<< HEAD
        map(this.jsonDataToResource.bind(this))/*,
        catchError(this.handleError)*/
    )
}

/*handleError(error) {
  console.log("SWEET NIGHT")
  let errorMessage = '';
  if (error.error instanceof HttpErrorResponse) {
=======
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)
    )
}

handleError(error) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
>>>>>>> 0554b3279e65ae1c366a8eaa24b050bc476bcb24
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
  } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}

<<<<<<< HEAD

*/
=======
>>>>>>> 0554b3279e65ae1c366a8eaa24b050bc476bcb24
}
