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

  public getEnderecoColaboracao(colaboracao: Colaboracao): Promise<Endereco>{
    var enderecoStr = '';
    if(colaboracao.rua)
      enderecoStr += colaboracao.rua + ',';
    if(colaboracao.numero)
      enderecoStr += colaboracao.numero + ',';
    if(colaboracao.complemento)
      enderecoStr += colaboracao.complemento + ',';
    if(colaboracao.bairro)
      enderecoStr += colaboracao.bairro + ',';
    if(colaboracao.cidade)
      enderecoStr += colaboracao.cidade + ',';

    var endereco: Endereco;

    this.enderecoService.getByEndereco(encodeURI(enderecoStr)).subscribe(
      value => endereco = value
    );
  console.log(enderecoStr);

    return new Promise(resolve =>{
      setTimeout(() => resolve(endereco) , 1800)
    });
  }

  public async setCamposRestantes(colaboracao: Colaboracao): Promise<void> {
    var endereco = await this.getEnderecoColaboracao(colaboracao);

    setTimeout(() => {
      if (endereco) {
        colaboracao.latitude = endereco.latitude;
        colaboracao.longitude = endereco.longitude;
        colaboracao.idUsuario = 1;
        colaboracao.dataRegistro = '2020-06-15';
        console.log(colaboracao.dataRegistro);
      }
    }, 1800);
  }
}
