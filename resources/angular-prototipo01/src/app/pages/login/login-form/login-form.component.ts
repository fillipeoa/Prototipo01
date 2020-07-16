import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenPayload, AuthenticationService } from 'src/app/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



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

    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;

    constructor(
      private auth: AuthenticationService,
      private router: Router,
      private formBuilder: FormBuilder,
    ) {
        // redirect to home if already logged in
        //if (this.auth.isLoggedIn) {
        //  this.router.navigate(['/']);
        //}
    }

    protected creationPageTitle(): string{
      return "Login"
    }

    login() {
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

      this.auth.login(this.credentials).subscribe(
        () => {
          this.router.navigateByUrl('/colaboracoes/')
        }, err => {
            console.log(err);
        }
      )
    }

}
