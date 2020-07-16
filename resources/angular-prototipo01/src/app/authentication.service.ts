import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, of} from 'rxjs'
import {map} from 'rxjs/operators'
import {Router} from '@angular/router'

export interface DetalhesUsuario {
  id: number
  nome: string
  email: string
  password: string
  foto: string
  exp: number
 // iat: number
}

export interface TokenResponse{
  token: string
}

export interface TokenPayload {
  id: 0,
  nome: '',
  email: string,
  password: string
}

@Injectable()

export class AuthenticationService {
  private token: string

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('usuarioToken', token);
    this.token = token;
    console.log(this.token)
  }

  private getToken(): string {
    if(!this.token) {
      this.token = localStorage.getItem('usuarioToken');
    }
    return this.token;
  }

  public getDetalhesUsuario(): DetalhesUsuario {
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
    const usuario = this.getDetalhesUsuario()
    if(usuario){
      return usuario.exp > Date.now() / 1000
    }else{
      return false
    }
  }

  public stored(usuario: TokenPayload):Observable<any>{
    console.log('namus voice: stored')
    return this.http.post('/api/prototipo01/usuarios/', usuario,
    {
      headers: {'Content-Type': 'application/json'}
    })
  }

  public login(usuario: TokenPayload): Observable<any>{

    const base = this.http.post(
      '/api/prototipo01/login',
      { email: usuario.email, password: usuario.password },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )

    const request = base.pipe(
      map((data: TokenResponse) => {
        if(data.token){
          this.saveToken(data.token)
        }
        return data;
      })
    )

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
  }


}
