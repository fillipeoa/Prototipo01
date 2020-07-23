import { BaseResourceModel } from '../models/base-resource.model';

import {HttpClient, HttpHeaders} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Injector } from '@angular/core';
import {AuthenticationService} from "../../authentication.service";

export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient;
    protected token;
    protected usuarioLogado;

    constructor(
        protected apiPath: string,
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData) => T,
        authenticationService: AuthenticationService
    ){
        this.http = injector.get(HttpClient);
        this.token = "Bearer "+authenticationService.getToken();
        this.usuarioLogado = authenticationService.getDetalhesUsuario();
    }

    getAll(): Observable<T[]> {
      /*var configHeader =
        {
          headers: {
              'Authorization': this.token
          }
         }*/
        console.log("call me maybe all");
        return this.http.get(this.apiPath/*, configHeader*/).pipe(
            map(this.jsonDataToResources.bind(this)),
          //  catchError(this.handleError)
        );
    }

    getById(id: number): Observable<T> {
      console.log("call me maybe id");

        const url = `${this.apiPath}/${id}`;

        return this.http.get(url).pipe(
            map(this.jsonDataToResource.bind(this)),
            //catchError(this.handleError)
        );
    }

    create(resource: T): Observable<T> {
      var configHeader =
        {
          headers: {
              'Authorization': this.token
          }
        };
        return this.http.post(this.apiPath, resource, configHeader).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError)
        )
    }

    update(resource: T): Observable<T> {
        var configHeader =
        {
          headers: {
            'Authorization': this.token
          }
        };

        const url = `${this.apiPath}/${resource.id}`;

        return this.http.put(url, resource, configHeader).pipe(
            map(() => resource),
            catchError(this.handleError),
        )
    }

    delete(id: number): Observable<any> {
        var configHeader =
        {
          headers: {
            'Authorization': this.token
          }
        };

        const url = `${this.apiPath}/${id}`;

        return this.http.delete(url, configHeader).pipe(
            map(() => null),
            catchError(this.handleError)
        )
    }


    //PROTECTED METHODS

    protected jsonDataToResources(jsonData: any[]): T[] {
        const resources: T[] = [];
        jsonData['data'].forEach(element => resources.push(this.jsonDataToResourceFn(element)));
        return (resources);
    }

    protected jsonDataToResource(jsonData: any): T {
        return this.jsonDataToResourceFn(jsonData);
    }

    protected handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÃO => ", error);
        return throwError(error);
    }
}
