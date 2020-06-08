import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";

import { ColaboracoesRoutingModule } from './colaboracoes-routing.module';
import { ColaboracaoListComponent } from './colaboracao-list/colaboracao-list.component';
import { ColaboracaoFormComponent } from './colaboracao-form/colaboracao-form.component';

@NgModule({
  declarations: [ColaboracaoListComponent, ColaboracaoFormComponent],
  imports: [
    SharedModule,
    ColaboracoesRoutingModule
  ]
})

export class ColaboracoesModule {}
