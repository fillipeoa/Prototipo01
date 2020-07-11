import { Injectable, Injector } from '@angular/core';
import { Colaboracao } from "./colaboracao.model";

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import {EnderecoService} from "../../../shared/services/endereco.service";
import {Endereco} from "../../../shared/models/endereco.model";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class ColaboracaoService extends BaseResourceService<Colaboracao> {

  enderecoService: EnderecoService;

  constructor(protected injector: Injector, enderecoService: EnderecoService) {
    super('http://localhost:8000/api/prototipo01/colaboracoes', injector, Colaboracao.fromJson);
    this.enderecoService = enderecoService;
  }

  public getByUsuario(){
    var configHeader =
      {
        headers: {
            'Authorization': this.token
        }
       }
    var idUsuario = 1;

    const url = `http://localhost:8000/api/prototipo01/usuarios/${idUsuario}/colaboracoes`;
    return this.http.get(url, configHeader).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    );
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

    if(enderecoStr && enderecoStr != ''){
      console.log(enderecoStr);
      this.enderecoService.getByEndereco(encodeURI(enderecoStr)).subscribe(
        value => endereco = value
      );
    }

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
