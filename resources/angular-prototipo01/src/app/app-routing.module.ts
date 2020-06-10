import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'colaboracoes', loadChildren: () => import('./pages/colaboracoes/colaboracoes.module').then(m => m.ColaboracoesModule) },

  { path: '', redirectTo:'colaboracoes', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
