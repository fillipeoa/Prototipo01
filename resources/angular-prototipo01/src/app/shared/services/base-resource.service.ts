import { BaseResourceModel } from '../models/base-resource.model';

import {HttpClient, HttpHeaders} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Injector } from '@angular/core';

export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient;
    protected token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9wcm90b3RpcG8wMVwvbG9naW4iLCJpYXQiOjE1OTQ0Nzk2MTMsImV4cCI6MTU5NDQ4MzIxMywibmJmIjoxNTk0NDc5NjEzLCJqdGkiOiJiU2ZrMGhXdkpNT2djbUhmIiwic3ViIjoyMiwicHJ2IjoiMGIwY2Y1MGFmMTIzZDg1MDZlMTZlYmE3Y2I2NzYyOTc0ZGEzYWMzYSJ9.cfF47a4d7aktnFAGqJbpVmvWJt90K8k1wvHzMlLl2kU';

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
        console.log("eu")
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
