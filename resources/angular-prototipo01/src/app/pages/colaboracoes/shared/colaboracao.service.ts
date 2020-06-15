import { Injectable, Injector } from '@angular/core';
import { Colaboracao } from "./colaboracao.model";

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import {EnderecoService} from "../../../shared/services/endereco.service";
import {Endereco} from "../../../shared/models/endereco.model";
@Injectable({
  providedIn: 'root'
})
export class ColaboracaoService extends BaseResourceService<Colaboracao> {

  enderecoService: EnderecoService;

  constructor(protected injector: Injector, enderecoService: EnderecoService) {
    super('http://localhost:8000/api/prototipo01/colaboracoes', injector, Colaboracao.fromJson);
    this.enderecoService = enderecoService;
  }

  public setCamposRestantes(colaboracao: Colaboracao): void{
    var enderecoStr = colaboracao.rua + ',' + colaboracao.numero
    + ', ' + colaboracao.complemento + ', ' + colaboracao.bairro + '. ' + colaboracao.cidade;
    var endereco: Endereco;

    this.enderecoService.getByEndereco(encodeURI(enderecoStr)).subscribe(
      value => endereco = value
      );

    setTimeout(()=>{
      if(endereco){
        alert(1);
        colaboracao.latitude = endereco.latitude;
        colaboracao.longitude = endereco.longitude;
        colaboracao.idUsuario = 1;
        colaboracao.dataRegistro = '2020-06-15';
        console.log(colaboracao.dataRegistro);
      }
    }, 1800);

  }
}
