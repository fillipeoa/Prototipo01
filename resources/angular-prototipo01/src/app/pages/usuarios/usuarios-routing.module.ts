import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import {AuthGuardService} from "../../core/guards/auth-guard.service";

const routes: Routes = [
  //{ path: '', component: UsuarioFormComponent },
  { path: 'new', component: UsuarioFormComponent },
  { path: ':id/edit', component: UsuarioFormComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
