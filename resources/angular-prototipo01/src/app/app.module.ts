import { NgModule } from '@angular/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { ColaboracaoFilterPipe } from './pages/colaboracoes/colaboracao-list/colaboracao-filter.pipe';

@NgModule({
    declarations: [
        AppComponent,
        ColaboracaoFilterPipe

    ],
  imports: [
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  providers: [ AuthenticationService, AuthGuardService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
