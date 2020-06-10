import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core/core.module";
import { ColaboracaoListComponent } from './pages/colaboracoes/colaboracao-list/colaboracao-list.component';
import { ColaboracaoFormComponent } from './pages/colaboracoes/colaboracao-form/colaboracao-form.component';
import {BreadCrumbComponent} from "./shared/components/bread-crumb/bread-crumb.component";
import {SharedModule} from "./shared/shared.module";

@NgModule({
    declarations: [
        AppComponent
    ],
  imports: [
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
