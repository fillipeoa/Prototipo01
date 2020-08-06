import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import {UsuarioService} from "../../../pages/usuarios/shared/usuario.service";
import {Usuario} from "../../../pages/usuarios/shared/usuario.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public usuarioLogado: Usuario;

  constructor(public auth: AuthenticationService, public usuarioService: UsuarioService) {
    this.preencherNome();
  }

  async preencherNome(){
    if(this.auth.isLoggedIn()){
      this.usuarioLogado = await this.usuarioService.getUsuarioLogado();
    }
  }

  title = 'angular-prototipo01';

}

