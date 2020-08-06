import { Injectable, Injector } from '@angular/core';
import { Colaboracao } from "./colaboracao.model";

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import {EnderecoService} from "../../../shared/services/endereco.service";
import {Endereco} from "../../../shared/models/endereco.model";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {AuthenticationService} from "../../../authentication.service";
@Injectable({
  providedIn: 'root'
})
export class ColaboracaoService extends BaseResourceService<Colaboracao> {

  enderecoService: EnderecoService;

  constructor(protected injector: Injector, enderecoService: EnderecoService, private authenticationService: AuthenticationService) {
    super('http://localhost:8000/api/prototipo01/colaboracoes', injector, Colaboracao.fromJson, authenticationService);
    this.enderecoService = enderecoService;
  }

  public getByUsuario(){
    var configHeader =
      {
        headers: {
            'Authorization': this.token
        }
       }

       const idUsuarioLogado = this.detalhesToken.sub;
       const url = `http://localhost:8000/api/prototipo01/usuarios/${idUsuarioLogado}/colaboracoes`;

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
      this.enderecoService.getByEndereco(encodeURI(enderecoStr)).subscribe(
        value => endereco = value
      );
    }

    return new Promise(resolve =>{
      setTimeout(() => resolve(endereco) , 1800)
    });
  }

  public async setCamposRestantes(colaboracao: Colaboracao, mapa): Promise<void> {
      if (mapa) {
        colaboracao.latitude = mapa.map.getBounds().getCenter().lat;
        colaboracao.longitude = mapa.map.getBounds().getCenter().lng;
        colaboracao.idUsuario = this.authenticationService.getDetalhesToken().sub;
        colaboracao.dataRegistro = this.dataFormatada();
      }

    return new Promise(resolve =>{
      setTimeout(() => resolve() , 1800)
    });
  }

  public dataFormatada(){
    var data = new Date(),
      dia  = data.getDate().toString().padStart(2, '0'),
      mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
      ano  = data.getFullYear(),
      hora  = data.getHours().toString().padStart(2, '0'),
      minuto  = data.getMinutes().toString().padStart(2, '0'),
      segundo  = data.getSeconds().toString().padStart(2, '0')
    ;

    return ano+"/"+mes+"/"+dia+" "+hora+":"+minuto+":"+segundo;
  }
}
