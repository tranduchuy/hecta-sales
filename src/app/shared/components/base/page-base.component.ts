import { FormGroup, AbstractControl } from '@angular/forms';
import {Observable, of, Subscription} from 'rxjs';
import {OnDestroy} from '@angular/core';

export abstract class PageBaseComponent implements OnDestroy {
  protected subscriptions: Subscription[] = [];

  public getErrorMessages(form: FormGroup, ...controlNames: string[]): string[] {
    let errors: string[] = [];
    controlNames.forEach(name => {
      errors = errors.concat(this.getErrorMessagesFromControlName(form, name));
    });

    return errors;
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
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
