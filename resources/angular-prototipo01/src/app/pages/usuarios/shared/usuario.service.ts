import { Injectable, Injector } from '@angular/core';
import { Usuario } from "./usuario.model";

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {AuthenticationService} from "../../../authentication.service";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseResourceService<Usuario> {

  public usuarioLogado: Usuario;

  constructor(protected injector: Injector, private authenticationService: AuthenticationService) {
    super('http://localhost:8000/api/prototipo01/usuarios', injector, Usuario.fromJson, authenticationService);
  }

  create(resource: Usuario): Observable<Usuario> {
    return this.http.post(this.apiPath, resource).pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)
    )
}

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
