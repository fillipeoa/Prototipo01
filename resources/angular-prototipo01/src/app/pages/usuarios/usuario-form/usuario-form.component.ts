import { Component, Injector } from '@angular/core';
import { Validators } from "@angular/forms";

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

import { Usuario } from "../shared/usuario.model";
import { UsuarioService } from "../shared/usuario.service";
import { TokenPayload, AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent extends BaseResourceFormComponent<Usuario> {

  constructor(
    protected usuarioService: UsuarioService,
    protected injector: Injector,
    private auth: AuthenticationService,
    ) {
    super(injector, new Usuario(), usuarioService, Usuario.fromJson);
  }

  credentials: TokenPayload = {
    id: 0,
    nome: '',
    email: '',
    password: '',
//foto: ''
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

  protected editionPageTitle(): string {
    const resourceName = this.resource.nome || "";
    return "Editando Usuário: " + resourceName;
  }

  protected createResource() {
    this.auth.stored(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/')
      },
      err => {
        console.error(err)
      }
    )

    /*const resource: Usuario = this.jsonDataToResourceFn(this.resourceForm.value);
    setTimeout(() => {
        this.resourceService.create(resource)
          .subscribe(
            resource => this.actionsForSuccess(resource),
            error => this.actionsForError(error)
          )
      }
      , 2000)
  }*/

  }
}
