import { Component, Injector } from '@angular/core';
import { Validators } from "@angular/forms";

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

import { Usuario } from "../shared/usuario.model";
import { UsuarioService } from "../shared/usuario.service";
import { TokenPayload, AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';
import { extractErrorMessagesFromErrorResponse } from 'src/app/core/components/helper-functions/extract-error-messages-from-error-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent extends BaseResourceFormComponent<Usuario> {

  constructor(
    protected usuarioService: UsuarioService,
    protected router: Router,
    protected injector: Injector,
    private auth: AuthenticationService,
    ) {
    super(injector, new Usuario(), usuarioService, Usuario.fromJson);
  }

  protected buildResourceForm(){
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      foto: [null, [Validators.required]],
    })
  }


  protected creationPageTitle(): string{
    return "Novo Usuário"
  }

  const resource: Usuario = this.jsonDataToResourceFn(this.resourceForm.value);
        this.resourceService.create(suario)
          .subscribe(
            (response) => {
              // do something with success response
            },
            (errorResponse: HttpErrorResponse) => {
              // Extract form error messages from API  <------ HERE!!!
              const messages = extractErrorMessagesFromErrorResponse(errorResponse);
            },
  }


 /*protected editionPageTitle(): string {
    const resourceName = this.resource.nome || "";
    return "Editando Usuário: " + resourceName;
  }*/
}
