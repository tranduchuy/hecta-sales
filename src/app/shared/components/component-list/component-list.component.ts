import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { MessageService } from '../../services/message/message.service';
import { ValidatorService } from '../../services/validators/validator.service';
import { PageBaseComponent } from '../base/page-base.component';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss']
})
export class ComponentListComponent extends PageBaseComponent
  implements OnInit {
  form: FormGroup;
  usernameIcon = 'access_time';
  radioGroupItemsSource = [
    {
      name: 'Male',
      value: 0
    },
    {
      name: 'Female',
      value: 1
    }
  ];
  checkboxGroupItemsSource = [
    {
      name: 'District 1',
      value: 'd1'
    },
    {
      name: 'District 2',
      value: 'd2'
    },
    {
      name: 'District 3',
      value: 'd3'
    },
    {
      name: 'District 4',
      value: 'd4'
    }
  ];

  cityItemsSource = [
    {
      name: 'Ho Chi Minh',
      value: 'hcm'
    },
    {
      name: 'Ha Noi',
      value: 'hn'
    }
  ];

  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private validatorService: ValidatorService) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [this.validatorService.getInputRequired()]],
      password: [''],
      gender: [0],
      districts: [['d2'], [this.validatorService.getInputRequired()]],
      city: ['', [this.validatorService.getInputRequired()]]
    });

    this.form.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value: any) => {
        console.log('form value', value);
      });

    console.log(this.messageService.get('100'));
  }

  onRadioChange(event: any): void {
    console.log('radio group change', event);
  }
}
