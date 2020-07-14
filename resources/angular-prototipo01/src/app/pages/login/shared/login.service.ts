import { Injectable, Injector } from '@angular/core';
import { Login } from "./login.model";

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseResourceService<Login> {

  constructor(protected injector: Injector) {
    super('http://localhost:8000/api/prototipo01/login', injector, Login.fromJson);
  }

}
