import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';

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
  providers: [ AuthenticationService, AuthGuardService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
