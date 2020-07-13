import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    SharedModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
