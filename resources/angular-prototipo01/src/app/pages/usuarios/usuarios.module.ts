import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { UsuariosRoutingModule } from "./usuarios-routing.module";
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsuarioFormComponent],
  imports: [
    SharedModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
