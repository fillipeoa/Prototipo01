import { Router } from "@angular/router";
import { AuthenticationService, TokenPayload } from 'src/app/authentication.service';
import { Component } from '@angular/core';

@Component({
  templateUrl: './login-form.component.html'
})

export class LoginFormComponent {

  credentials: TokenPayload = {
    id: 0,
    nome: '',
    email: '',
    password: '',
    foto:''
  }

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ){}

  login(){
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/')
      },
      err => {
        console.error(err)
      }
    )
  }
}
