import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseResourceFormComponent } from '../base-resource-form/base-resource-form.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FormStatus } from 'src/app/core/components/helper-functions/form-status';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

  formStatus = new FormStatus();

  //retorna a mensagem
  public get errorMessage(): string | null {
    if (this.mustShowErrorMessage()) {
      return this.getErrorMessage();
    } else {
      return null;
    }
  }

  //verifica se a mensagem deve ser exibida: se o usuario tiver invalido e se o suario tiver tocadi
  private mustShowErrorMessage(): boolean {
    return (this.formControl.invalid && this.formControl.touched);
  }

  private getErrorMessage(): string | null {
    if (this.formControl.errors.required) {
      return "Por favor, preencha este campo.";

    } else if (this.formControl.errors.minlength) {
      const requiredLength = this.formControl.errors.minlength.requiredLength;
      return `A senha deve ter no mínimo ${requiredLength} caracteres.`

    } else {
      return null
    }
  }
}
