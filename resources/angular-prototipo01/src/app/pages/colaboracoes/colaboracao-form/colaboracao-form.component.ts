import {Component, Injector, ViewChild} from '@angular/core';
import { Validators } from "@angular/forms";

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

import { Colaboracao } from "../shared/colaboracao.model";
import { ColaboracaoService } from "../shared/colaboracao.service";
import {Endereco} from "../../../shared/models/endereco.model";
import {MapaComponent} from "../../../shared/components/mapa/mapa.component";

@Component({
  selector: 'app-category-form',
  templateUrl: './colaboracao-form.component.html',
  styleUrls: ['./colaboracao-form.component.css']
})
export class ColaboracaoFormComponent extends BaseResourceFormComponent<Colaboracao> {
  public endereco: Endereco;
  public enderecoNaoEncontrado: boolean;
  public podeRecarregar: boolean = true;

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

  protected viewPageTitle(): string {
    const resourceName = this.resource.titulo || "Colaboração";
    return resourceName;
  }

  protected createResource() {
    const resource: Colaboracao = this.jsonDataToResourceFn(this.resourceForm.value);
    this.colaboracaoService.setCamposRestantes(resource);

    setTimeout(() => {
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

  public async setEndereco() {
    this.podeRecarregar = false;

    const resource = this.jsonDataToResourceFn(this.resourceForm.value);

    this.endereco = await this.colaboracaoService.getEnderecoColaboracao(resource);

    if(!this.endereco) {
      this.enderecoNaoEncontrado = true;
    }
  }

  protected loadResource() {
    super.loadResource();
    setTimeout(() => {
      this.setEndereco();
    } , 1000);
  }

  public isReadOnly(): boolean{
    if(this.currentAction == 'edit' || this.currentAction == 'new'){
      return false;
    }else{
      return true;
    }
  }
}

