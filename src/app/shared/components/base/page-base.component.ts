import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

export abstract class PageBaseComponent implements OnDestroy {
  protected subscriptions: Subscription[] = [];

  public getErrorMessages(form: FormGroup, ...controlNames: string[]): string[] {
    let errors: string[] = [];
    controlNames.forEach(name => {
      errors = errors.concat(this.getErrorMessagesFromControlName(form, name));
    });

    return errors;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  protected openWarningDialog(): Observable<any> {
    return of();
  }

  protected openInfoDialog(): Observable<any> {
    return of();
  }

  protected openConfirmDialog(): Observable<any> {
    return of();
  }

  protected markAsTouchedForAll(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.markAsTouchedForAll(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(innerFormGroup => {
          if (innerFormGroup instanceof FormGroup) {
            this.markAsTouchedForAll(innerFormGroup);
          }
        });
      }
    });
  }

  protected markAsUntouchedForAll(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsUntouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.markAsUntouchedForAll(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(innerFormGroup => {
          if (innerFormGroup instanceof FormGroup) {
            this.markAsUntouchedForAll(innerFormGroup);
          }
        });
      }
    });
  }

  protected markAsPristineForAll(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsPristine({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.markAsPristineForAll(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(innerFormGroup => {
          if (innerFormGroup instanceof FormGroup) {
            this.markAsPristineForAll(innerFormGroup);
          }
        });
      }
    });
  }

  private getErrorMessagesFromControlName(form: FormGroup, ctrlName: string): string[] {
    const control = form.controls[ctrlName];
    return this.getSingleErrorMessages(control);
  }

  private getSingleErrorMessages(control: AbstractControl): string[] {
    let sErr: string[] = [];
    if (!control.valid && control.touched && control.errors) {
      sErr = Object.values(control.errors);
    }

    return sErr;
  }
}
