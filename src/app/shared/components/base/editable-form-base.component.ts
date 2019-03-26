import { FormGroup, FormBuilder } from '@angular/forms';
import { ErrorNames, ValidatorService } from '../../services/validators/validator.service';
import { PageBaseComponent } from './page-base.component';
import { ServiceLocator } from '../../services/service-locator';

export abstract class EditableFormBaseComponent extends PageBaseComponent {

  protected fb: FormBuilder;
  protected validatorService: ValidatorService;

  form: FormGroup;
  errors: any[] = [];

  constructor() {
    super();

    this.fb = ServiceLocator.injector.get(FormBuilder);
    this.validatorService = ServiceLocator.injector.get(ValidatorService);
  }

  abstract post(name?: string): void;

  onSubmit(name?: string) {
    this.errors = [];
    this.markAsTouched(this.form);
    this.buildObjectError(this.form);

    if (this.errors.length !== 0) {
      alert(['Please check: form have ' + this.errors.length + ' errors.']);
      return;
    }

    return this.post(name);
  }

  getMessageErrors(controlName: string): string[] {
    const control = this.form.controls[controlName];
    if (!control.errors || !control.touched) {
      return [];
    }

    const keyErrors = Object.keys(control.errors);

    return keyErrors.map(key => this.getMessage(key));
  }

  markAsTouched(form: FormGroup) {
    const controls = Object.keys(form.controls);
    controls.forEach((controlName: string) => {
      const control = form.controls[controlName];
      if (control instanceof FormGroup) {
        this.markAsTouched(control);
      } else {
        control.markAsTouched({onlySelf: true});
      }
    });
  }

  buildObjectError(form: FormGroup) {
    const controls = Object.keys(form.controls);
    controls.forEach((controlName: string) => {
      const control = form.controls[controlName];
      if (control instanceof FormGroup) {
        this.buildObjectError(control);
      } else if (!control.errors) {
        // do nothing
      } else {
        const errorKeys = Object.keys(control.errors);
        errorKeys.forEach((k: any) => {
          if (this.errors.indexOf(k) === -1) {
            this.errors.push(`${k}: ` + this.getMessage(k));
          }
        });
      }
    });
  }

  private getMessage(keyErr: string): string {
    switch (keyErr) {
      case ErrorNames.required[0]:
        return ErrorNames.required[1];

      case ErrorNames.slug[0]:
        return ErrorNames.slug[1];

      case ErrorNames.fileNotLoad[0]:
        return ErrorNames.fileNotLoad[1];

      case ErrorNames.patternUrl[0]:
        return ErrorNames.patternUrl[1];

      case ErrorNames.minLength[0]:
        return ErrorNames.minLength[1];

      case ErrorNames.maxLength[0]:
        return ErrorNames.maxLength[1];

      case ErrorNames.patternNumber[0]:
        return ErrorNames.patternNumber[1];

      case ErrorNames.areStoreSelected[0]:
        return ErrorNames.areStoreSelected[1];
      case ErrorNames.patternHotlineNumber[0]:
        return ErrorNames.patternHotlineNumber[1];
      case ErrorNames.minNumberValue[0]:
        return ErrorNames.minNumberValue[1];
    }

    return `Something error ${keyErr}`;
  }
}
