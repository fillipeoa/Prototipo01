import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import {UsuarioService} from "../../../pages/usuarios/shared/usuario.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public auth: AuthenticationService) {
    console.log(auth.getDetalhesUsuario());
  }

  title = 'angular-prototipo01';

}

