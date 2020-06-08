import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColaboracaoListComponent } from './colaboracao-list/colaboracao-list.component';
import { ColaboracaoFormComponent } from './colaboracao-form/colaboracao-form.component';


const routes: Routes = [
  { path: '', component: ColaboracaoListComponent },
  { path: 'nova', component: ColaboracaoFormComponent },
  { path: ':id/editar', component: ColaboracaoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboracoesRoutingModule { }
