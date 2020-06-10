import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {ColaboracoesRoutingModule} from "./colaboracoes-routing.module";
import {ColaboracaoFormComponent} from "./colaboracao-form/colaboracao-form.component";
import {ColaboracaoListComponent} from "./colaboracao-list/colaboracao-list.component";
import { ColaboracaoMapComponent } from './colaboracao-map/colaboracao-map.component';

@NgModule({
  declarations: [ColaboracaoFormComponent, ColaboracaoListComponent, ColaboracaoMapComponent],
  imports: [
    SharedModule,
    ColaboracoesRoutingModule
  ]
})
export class ColaboracoesModule { }
