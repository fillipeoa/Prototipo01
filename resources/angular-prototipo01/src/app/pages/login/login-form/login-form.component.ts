import { Router } from "@angular/router";
import { AuthenticationService } from 'src/app/authentication.service';
import { Component } from '@angular/core';
import set = Reflect.set;

@Component({
  templateUrl: './login-form.component.html'
})

export class LoginFormComponent {

  credentials = {
    email: '',
    password: ''
  }

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) {
  }

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/');
      },
      err => {
        console.error(err)
      }
    )

    return new Promise(resolve =>{
      setTimeout(() => resolve() , 1800);
    });
  }

  async loginAssync() {
    await this.login();
  }

}
