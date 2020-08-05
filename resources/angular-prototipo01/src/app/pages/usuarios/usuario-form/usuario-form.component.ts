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
import { AuthenticationService } from 'src/app/authentication.service';
import {Colaboracao} from "../../colaboracoes/shared/colaboracao.model";
@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent extends BaseResourceFormComponent<Usuario> {
  private fotoSelecionada: File;

  constructor(
    protected usuarioService: UsuarioService,
    protected router: Router,
    protected injector: Injector,
    private auth: AuthenticationService,
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

  onFileChanged(event) {
    this.fotoSelecionada  = event.target.files[0];
  }

  protected createResource() {
    const formData = new FormData();
    formData.append('foto', this.fotoSelecionada, this.fotoSelecionada.name);
    formData.append('id', this.resourceForm.get('id').value);
    formData.append('nome', this.resourceForm.get('nome').value);
    formData.append('email', this.resourceForm.get('email').value);
    formData.append('password', this.resourceForm.get('password').value);
    console.log(formData.get('email'));

    this.usuarioService.create(formData)
      .subscribe(
        resource => this.actionsForSuccess(resource),
        error => this.actionsForError(error)
      );
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
