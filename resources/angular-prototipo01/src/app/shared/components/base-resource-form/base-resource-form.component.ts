import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

import { switchMap } from "rxjs/operators";

import toastr from "toastr";
import {error} from "@angular/compiler/src/util";

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

    currentAction: string;
    resourceForm: FormGroup;
    pageTitle: string;
    serverErrorMessages: string[] = null;
    submittingForm: boolean = false;


    protected route: ActivatedRoute;
    protected router: Router;
    protected formBuilder: FormBuilder;

    constructor(
        protected injector: Injector,
        public resource: T,
        protected resourceService: BaseResourceService<T>,
        protected jsonDataToResourceFn: (jsonData) => T
    ) {
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
        this.formBuilder = injector.get(FormBuilder);
    }

    ngOnInit(): void {
        this.setCurrentAction();
        this.buildResourceForm();
        this.loadResource();
    }

    ngAfterContentChecked() {
        this.setPageTitle();
    }

    submitForm() {
        this.submittingForm = true;

      if (this.currentAction == 'new') {
            this.createResource();
        } else {
            this.updateResource();
        }
    }



    //PRIVATE METhods

    protected setCurrentAction() {
        if (this.route.snapshot.url[0].path == 'new') {
            this.currentAction = 'new';
        }
        else {
          if (this.route.snapshot.url[1] && this.route.snapshot.url[1].path == 'edit'){
            this.currentAction = 'edit'
          }
          else {
            this.currentAction = 'view'
          }
        }
    }

    protected loadResource() {
        if (this.currentAction == 'edit' || this.currentAction == 'view') {
            this.route.paramMap.pipe(
                switchMap(params => this.resourceService.getById(+params.get('id')))
            )
                .subscribe(
                    (resource) => {
                        this.resource = resource;
                        this.resourceForm.patchValue(resource) // binds loaded resource data to ResourceForm
                    },
                    (error) => alert('Ocorreu um erro no servidor, tente mais tarde')
                )
        }
    }

    protected setPageTitle() {
        if (this.currentAction == 'new') {
            this.pageTitle = this.creationPageTitle();

        }
        else if(this.currentAction == 'edit'){
            this.pageTitle = this.editionPageTitle();
        }
        else {
            this.pageTitle = this.viewPageTitle();
        }
    }

    protected creationPageTitle(): string{
        return "Novo";
    }

    protected editionPageTitle(): string{
        return "Edição";
    }

    protected viewPageTitle(): string{
        return "Visualizar";
    }

    protected createResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
          this.resourceService.create(resource)
            .subscribe(
                resource => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
            );
    }

    protected updateResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

        this.resourceService.update(resource)
            .subscribe(
                resource => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
            )
    }

    protected actionsForSuccess(resource: T) {
        toastr.success('Solicitação processada com sucesso!');

        const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

        // redirect/reload component page
        try {
          this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true }).then(
            () => this.router.navigate([baseComponentPath]),
          )
        }catch (e) {
          this.router.navigate(['']);
        }

    }

    protected actionsForError(error) {
        toastr.error('Ocorreu um erro ao processar a sua solicitação!');

        this.submittingForm = false;

        if (error.status == 422) {
            this.serverErrorMessages = JSON.parse(error._body).errors;
        } else {
            this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor tente mais tarde.'];
        }
    }

    protected abstract buildResourceForm(): void;
}
