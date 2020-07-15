import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenPayload, AuthenticationService } from 'src/app/authentication.service';



@Component({
  templateUrl: 'login-form.component.html'
})

export class LoginFormComponent {
    credentials: TokenPayload = {
      id: 0,
      nome: '',
      email: '',
      password: '',
      foto: ''
    }

    constructor(private auth: AuthenticationService, private router: Router) { }

    login() {
      this.auth.login(this.credentials).subscribe(
        () => {
          this.router.navigateByUrl('/login/')
        }, err => {
            console.log(err);
        }
      )
    }

}
