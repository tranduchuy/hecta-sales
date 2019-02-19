import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { MessageService } from '../../services/message/message.service';
import { ValidatorService } from '../../services/validators/validator.service';
import { PageBaseComponent } from '../base/page-base.component';
import { DialogResult, DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss'],
  providers: [DialogService]
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

  autoCompleteItemsSource = [
    {
      name: 'Honda',
      value: 'honda'
    }, {
      name: 'Suzuki',
      value: 'suzuki'
    }, {
      name: 'Yamaha',
      value: 'yamaha'
    }
  ];

  inputDate = {
    minDay: new Date(2018, 11, 1),
    maxDay: new Date(2019, 4, 1)
  };

  constructor(private fb: FormBuilder,
              private dialog: DialogService,
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
      city: ['', [this.validatorService.getInputRequired()]],
      bike: ['', [this.validatorService.getInputRequired()]],
      date: [null, [this.validatorService.getInputRequired()]]
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

  openDialogInfo(): void {
    this.dialog.openInfo('Test message')
      .subscribe((result: DialogResult) => {
        console.log('dialog info result', result);
      });
  }

  openDialogWarning(): void {
    this.dialog.openWarning('Test message?')
      .subscribe((result: DialogResult) => {
        console.log('dialog info result', result);
      });
  }

  openDialogConfirm(): void {
    this.dialog.openConfirm('Test message?')
      .subscribe((result: DialogResult) => {
        console.log('dialog info result', result);
      });
  }
}
