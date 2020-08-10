import { NgModule } from '@angular/core';
import { SharedModule} from "../../shared/shared.module";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ColaboracoesRoutingModule } from "./colaboracoes-routing.module";
import { ColaboracaoFormComponent } from "./colaboracao-form/colaboracao-form.component";
import { ColaboracaoListComponent } from "./colaboracao-list/colaboracao-list.component";
import { ColaboracaoMapComponent } from './colaboracao-map/colaboracao-map.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ColaboracaoFormComponent,
    ColaboracaoListComponent,
    ColaboracaoMapComponent
  ],
  imports: [
    SharedModule,
    ColaboracoesRoutingModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class ColaboracoesModule { }
