import { Injectable, Injector } from '@angular/core';
import { Usuario } from "./usuario.model";

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseResourceService<Usuario> {

  constructor(protected injector: Injector) {
    super('http://localhost:8000/api/prototipo01/usuarios', injector, Usuario.fromJson);
  }

}
