import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ColaboracaoListComponent} from "./colaboracao-list/colaboracao-list.component";
import {ColaboracaoFormComponent} from "./colaboracao-form/colaboracao-form.component";
import {RouterModule, Routes} from "@angular/router";
import {ColaboracaoMapComponent} from "./colaboracao-map/colaboracao-map.component";

const routes: Routes = [
  { path: '', component: ColaboracaoMapComponent },
  { path: 'listar', component: ColaboracaoListComponent },
  { path: 'nova', component: ColaboracaoFormComponent },
  { path: ':id/editar', component: ColaboracaoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboracoesRoutingModule { }
