import { Component, Injector } from '@angular/core';
import { Validators } from "@angular/forms";

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

import { Usuario } from "../shared/usuario.model";
import { UsuarioService } from "../shared/usuario.service";
import { Router } from '@angular/router';
import { extractErrorMessagesFromErrorResponse } from 'src/app/core/components/helper-functions/extract-error-messages-from-error-response';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerErrorMessagesComponent } from 'src/app/shared/components/server-error-messages/server-error-messages.component';
import { FormStatus } from 'src/app/core/components/helper-functions/form-status';

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
    //private auth: AuthenticationService,
    ) {
    super(injector, new Usuario(), usuarioService, Usuario.fromJson);
  }

  formStatus = new FormStatus();

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


  submit() {
    const resource: Usuario = this.jsonDataToResourceFn(this.resourceForm.value);
    // 2 - Call onFormSubmitting to handle setting the form as submitted and
    //     clearing the error and success messages array
    this.formStatus.onFormSubmitting();
    this.usuarioService.create(resource)
      .subscribe(
        (response) => {
          console.log(response)
        },
        (errorResponse: HttpErrorResponse) => {
          const messages = extractErrorMessagesFromErrorResponse(errorResponse);
          this.formStatus.onFormSubmitResponse({success: false, messages: messages});
        },
      );
  }
}



 /*protected editionPageTitle(): string {
    const resourceName = this.resource.nome || "";
    return "Editando Usuário: " + resourceName;
  }*/
