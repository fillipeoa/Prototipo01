import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColaboracaoMapComponent } from "./pages/colaboracoes/colaboracao-map/colaboracao-map.component";


const routes: Routes = [
  { path: '', component: ColaboracaoMapComponent },
  { path: 'busca/:endereco', component: ColaboracaoMapComponent },
  { path: 'colaboracoes', loadChildren: () => import('./pages/colaboracoes/colaboracoes.module').then(m => m.ColaboracoesModule) },
  { path: 'usuarios', loadChildren: () => import('./pages/usuarios/usuarios.module').then(u => u.UsuariosModule) },

 // { path: '', redirectTo:'colaboracoes', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
