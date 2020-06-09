import { Injectable, Injector } from '@angular/core';
import { Colaboracao } from "./colaboracao.model";

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
@Injectable({
  providedIn: 'root'
})
export class ColaboracaoService extends BaseResourceService<Colaboracao> {

  constructor(protected injector: Injector) {
    super('http://localhost:8000/api/prototipo01/colaboracoes', injector, Colaboracao.fromJson);
  }
}
