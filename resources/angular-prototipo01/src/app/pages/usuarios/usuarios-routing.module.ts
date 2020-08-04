import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

const routes: Routes = [
  //{ path: '', component: UsuarioFormComponent },
  { path: 'new', component: UsuarioFormComponent },
  { path: ':id/edit', component: UsuarioFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
