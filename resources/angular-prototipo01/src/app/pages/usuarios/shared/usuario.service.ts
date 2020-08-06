import { Injectable, Injector } from '@angular/core';
import { Usuario } from "./usuario.model";


import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {AuthenticationService} from "../../../authentication.service";
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseResourceService<Usuario> {

  public usuarioLogado: Usuario;

  constructor(protected injector: Injector, private authenticationService: AuthenticationService) {
    super('http://localhost:8000/api/prototipo01/usuarios', injector, Usuario.fromJson, authenticationService);
  }

  create(formData): Observable<Usuario> {
    return this.http.post(this.apiPath, formData).pipe(
        map(this.jsonDataToResource.bind(this))/*,
        catchError(this.handleError)*/
    )
}

/*handleError(error) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
  } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}*/

  public async getUsuarioLogado(): Promise<Usuario> {
    const usuario = await this.buscarUsuarioLogado();

    if(usuario){
      usuario.subscribe(usuario=>{this.usuarioLogado = usuario});

      return new Promise(resolve =>{
        setTimeout(() => resolve(this.usuarioLogado) , 1500);
      });
    }
    return null;
  }

  public buscarUsuarioLogado():Promise<Observable<Usuario>> {
    const token = this.authenticationService.getDetalhesToken();

    if(token){
      const usuarioLogado = this.getById(token.sub);

      return new Promise(resolve =>{
        setTimeout(() => resolve(usuarioLogado) , 1500);
      });
    }
    return null
  }
}
