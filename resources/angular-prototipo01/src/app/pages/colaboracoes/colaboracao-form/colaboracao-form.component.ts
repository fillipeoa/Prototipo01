import { Component, Injector } from '@angular/core';
import { Validators } from "@angular/forms";

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

import { Colaboracao } from "../shared/colaboracao.model";
import { ColaboracaoService } from "../shared/colaboracao.service";


@Component({
  selector: 'app-category-form',
  templateUrl: './colaboracao-form.component.html',
  styleUrls: ['./colaboracao-form.component.css']
})
export class ColaboracaoFormComponent extends BaseResourceFormComponent<Colaboracao> {

  constructor(protected colaboracaoService: ColaboracaoService, protected injector: Injector) {
    super(injector, new Colaboracao(), colaboracaoService, Colaboracao.fromJson);
  }

  protected buildResourceForm(){
    this.resourceForm = this.formBuilder.group({
      id: [null],
      idUsuario: [null],
      dataRegistro: [null],
      latitude: [null],
      longitude: [null],
      titulo: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null, [Validators.required, Validators.minLength(2)]],
      rua: [null, [Validators.required, Validators.minLength(2)]],
      numero: [null],
      bairro: [null, [Validators.required, Validators.minLength(2)]],
      complemento: [null],
      cidade: [null, [Validators.required, Validators.minLength(2)]],
      flagSituacao: [null, [Validators.required]]
    })
  }

  protected creationPageTitle(): string{
    return "Nova Colaboração"
  }

  protected editionPageTitle(): string {
    const resourceName = this.resource.titulo || "";
    return "Editando Colaboração: " + resourceName;
  }

  protected createResource() {
    const resource: Colaboracao = this.jsonDataToResourceFn(this.resourceForm.value);
    this.colaboracaoService.setCamposRestantes(resource);

    setTimeout(() => {
      alert(2);
        this.resourceService.create(resource)
          .subscribe(
            resource => this.actionsForSuccess(resource),
            error => this.actionsForError(error)
          )
      }
      , 2000)
  }

  protected updateResource() {
    const resource: Colaboracao = this.jsonDataToResourceFn(this.resourceForm.value);
    this.colaboracaoService.setCamposRestantes(resource);

    setTimeout(() => {
        this.resourceService.update(resource)
          .subscribe(
            resource => this.actionsForSuccess(resource),
            error => this.actionsForError(error)
          )
      }
      , 2000)
  }

}
