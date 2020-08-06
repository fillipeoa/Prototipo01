import {Injectable, Injector} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, of} from 'rxjs'
import {map} from 'rxjs/operators'
import {Router} from '@angular/router'
import {UsuarioService} from "./pages/usuarios/shared/usuario.service";
import {Usuario} from "./pages/usuarios/shared/usuario.model"

export interface TokenResponse{
  token: string
}

@Injectable()

export class AuthenticationService {
  private token: string;
  public nomeUsuarioLogado;

  constructor(private http: HttpClient, private router: Router) {
  }

  private saveToken(token: string): void {
    localStorage.setItem('usuarioToken', token);
    this.token = token;
  }

  public getToken(): string {
    if(!this.token) {
      this.token = localStorage.getItem('usuarioToken');
    }
    return this.token;
  }

  public getDetalhesToken() {
    const token = this.getToken();
    let payload
    if(token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    }else{
      return null
    }
  }

  public isLoggedIn(): boolean {
    const token = this.getDetalhesToken()
    if(token){
      return token.exp > Date.now() / 1000
    }else{
      return false
    }
  }

  public login(usuario): Observable<any>{

    const base = this.http.post(
      'http://localhost:8000/api/prototipo01/login',
      { email: usuario.email, password: usuario.password },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const request = base.pipe(
      map((data: TokenResponse) => {
        if(data.token){
          this.saveToken(data.token)
        }
        return data;
      })
    )

    base.subscribe(data => {
        if(data[0] && data[0].token){
          this.saveToken(data[0].token);
        }
    });


    return request;
  }

  public colaboracoes(): Observable<any> {
    return this.http.get('api/prototipo01/colaboracoes/{idColaboracao}', {
      headers: {Authorization: `Bearer ${this.getToken()}`}
    })
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('usuarioToken');
    this.router.navigateByUrl('/');
    window.location.reload();
  }


}
