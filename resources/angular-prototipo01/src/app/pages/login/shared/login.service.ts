import {HttpClient, HttpHeaders} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Injector } from '@angular/core';
import { Login } from './login.model';

export class LoginService {

    protected http: HttpClient;
    protected token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9wcm90b3RpcG8wMVwvbG9naW4iLCJpYXQiOjE1OTQ0Nzk2MTMsImV4cCI6MTU5NDQ4MzIxMywibmJmIjoxNTk0NDc5NjEzLCJqdGkiOiJiU2ZrMGhXdkpNT2djbUhmIiwic3ViIjoyMiwicHJ2IjoiMGIwY2Y1MGFmMTIzZDg1MDZlMTZlYmE3Y2I2NzYyOTc0ZGEzYWMzYSJ9.cfF47a4d7aktnFAGqJbpVmvWJt90K8k1wvHzMlLl2kU';

    constructor(
        protected apiPath: 'http://localhost:8000/api/prototipo01/usuarios',
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData) => Login
    ){
        this.http = injector.get(HttpClient);
    }

    create(login: Login): Observable<Login> {
      var configHeader =
        {
          headers: {
              'Authorization': this.token
          }
        };
        return this.http.post(this.apiPath, login, configHeader).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError)
        )
    }


    //PROTECTED METHODS

    protected jsonDataToResources(jsonData: any[]): Login[] {
        const resources: Login[] = [];
        jsonData['data'].forEach(element => resources.push(this.jsonDataToResourceFn(element)));
        return (resources);
    }

    protected jsonDataToResource(jsonData: any): Login {
        return this.jsonDataToResourceFn(jsonData);
    }

    protected handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÃO => ", error);
        return throwError(error);
    }
}
