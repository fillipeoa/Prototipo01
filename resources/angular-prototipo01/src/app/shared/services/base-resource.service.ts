import { BaseResourceModel } from '../models/base-resource.model';

import {HttpClient, HttpHeaders} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Injector } from '@angular/core';

export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient;
    private token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9wcm90b3RpcG8wMVwvbG9naW4iLCJpYXQiOjE1OTMxODU5NjcsImV4cCI6MTU5MzE4OTU2NywibmJmIjoxNTkzMTg1OTY3LCJqdGkiOiJENGozQUZwS1oyaVpuYTBEIiwic3ViIjoyMiwicHJ2IjoiMGIwY2Y1MGFmMTIzZDg1MDZlMTZlYmE3Y2I2NzYyOTc0ZGEzYWMzYSJ9.9LklhV2dAsweLFN-oS5CSMG0k3LpTMyhUrBIPer59ug';

    constructor(
        protected apiPath: string,
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData) => T
    ){
        this.http = injector.get(HttpClient);
    }

    getAll(): Observable<T[]> {
      /*var configHeader =
        {
          headers: {
              'Authorization': this.token
          }
         }*/
        return this.http.get(this.apiPath/*, configHeader*/).pipe(
            map(this.jsonDataToResources.bind(this)),
            catchError(this.handleError)
        );
    }

    getById(id: number): Observable<T> {

        const url = `${this.apiPath}/${id}`;

        return this.http.get(url).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError)
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
