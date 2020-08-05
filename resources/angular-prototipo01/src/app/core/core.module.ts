import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import {UsuarioService} from "../pages/usuarios/shared/usuario.service";
import {UsuariosModule} from "../pages/usuarios/usuarios.module";

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule
  ],
  exports:[
    //shared modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    //shared components
    NavbarComponent
  ]
})
export class CoreModule { }
