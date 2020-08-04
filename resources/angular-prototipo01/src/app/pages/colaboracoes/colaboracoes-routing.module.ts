import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColaboracaoListComponent } from "./colaboracao-list/colaboracao-list.component";
import { ColaboracaoFormComponent } from "./colaboracao-form/colaboracao-form.component";
import { RouterModule, Routes } from "@angular/router";
import { ColaboracaoMapComponent } from "./colaboracao-map/colaboracao-map.component";
import { AuthGuardService } from 'src/app/auth-guard.service';


const routes: Routes = [
  { path: '', component: ColaboracaoListComponent/*, canActivate: [AuthGuardService]*/ },
  { path: 'new', component: ColaboracaoFormComponent },
  { path: ':id/edit', component: ColaboracaoFormComponent },
  { path: ':id', component: ColaboracaoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboracoesRoutingModule { }
