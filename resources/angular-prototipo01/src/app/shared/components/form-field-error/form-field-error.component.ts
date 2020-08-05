import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseResourceFormComponent } from '../base-resource-form/base-resource-form.component';
<<<<<<< HEAD
import { HttpErrorResponse } from '@angular/common/http';
import { FormStatus } from 'src/app/core/components/helper-functions/form-status';
=======
>>>>>>> 0554b3279e65ae1c366a8eaa24b050bc476bcb24

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

<<<<<<< HEAD
  formStatus = new FormStatus();

  //retorna a mensagem
=======
>>>>>>> 0554b3279e65ae1c366a8eaa24b050bc476bcb24
  public get errorMessage(): string | null {
    if (this.mustShowErrorMessage()) {
      return this.getErrorMessage();
    } else {
      return null;
    }
  }

<<<<<<< HEAD
  //verifica se a mensagem deve ser exibida: se o usuario tiver invalido e se o suario tiver tocadi
  private mustShowErrorMessage(): boolean {
    return (this.formControl.invalid && this.formControl.touched);
  }

  //retorna uma mensagem de acordo com o requisito que não foi cumprido no formControl
=======
  private mustShowErrorMessage(): boolean {
    return (this.formControl.invalid  && this.formControl.touched);
  }

>>>>>>> 0554b3279e65ae1c366a8eaa24b050bc476bcb24
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
