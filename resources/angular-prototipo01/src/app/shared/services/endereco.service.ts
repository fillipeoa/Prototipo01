import { Endereco } from '../models/endereco.model';

import {HttpClient, HttpHeaders} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Injector, Injectable } from '@angular/core';
import {Colaboracao} from "../../pages/colaboracoes/shared/colaboracao.model";

@Injectable({
  providedIn: 'root'
})
export abstract class EnderecoService {

  protected http: HttpClient;

  constructor(
    protected injector: Injector
  ){
    this.http = injector.get(HttpClient);
  }

  getByEndereco(endereco: string): Observable<Endereco> {
    return this.http.get('http://localhost:8000/api/prototipo01/buscaLocal/' + endereco).pipe(
      map(this.jsonDataToEndereco).bind(this)/*,
      catchError(this.handleError)*/
    )
  }

  //PROTECTED METHODS
  protected jsonDataToEndereco(jsonData: any): Endereco {
    return Endereco.fromJson(jsonData);
  }

  /*protected handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  }*/
}
