import { BaseResourceModel } from '../models/base-resource.model';

import {HttpClient, HttpHeaders} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Injector } from '@angular/core';

export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient;
    private token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9wcm90b3RpcG8wMVwvbG9naW4iLCJpYXQiOjE1OTIyNTU4OTgsImV4cCI6MTU5MjI1OTQ5OCwibmJmIjoxNTkyMjU1ODk4LCJqdGkiOiJqQm1SSjlLTGNISTRqbHZEIiwic3ViIjoxLCJwcnYiOiIwYjBjZjUwYWYxMjNkODUwNmUxNmViYTdjYjY3NjI5NzRkYTNhYzNhIn0.5eDF5OeKpn-3ZhsEi3m3dksKkmiLzx3KolNOC80cAHM';

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
        )
    }

    create(resource: T): Observable<T> {
      console.log(resource);
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
        const url = `${this.apiPath}/${resource.id}`;

        return this.http.put(url, resource).pipe(
            map(() => resource),
            catchError(this.handleError),
        )
    }

    delete(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`;

        return this.http.delete(url).pipe(
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
