import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { MessageService } from '../../services/message/message.service';
import { ValidatorService } from '../../services/validators/validator.service';
import { PageBaseComponent } from '../base/page-base.component';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html'
})
export class ComponentListComponent extends PageBaseComponent
  implements OnInit {
  form: FormGroup;

  usernameIcon = 'access_time';

  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private validatorService: ValidatorService) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.form = this.fb.group({
        username: ['', [this.validatorService.getInputRequired()]]
      });

      this.form.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe((value: any) => {
          console.log('form value', value);
        });

      console.log(this.messageService.get('100'));
    }, 1000);
  }
}
