import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import {UsuarioService} from "./pages/usuarios/shared/usuario.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(public auth: AuthenticationService) { }
    title = 'angular-prototipo01';
}
