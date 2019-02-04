import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { PageBaseComponent } from '../base/page-base.component';

@Component({
    selector: 'app-component-list',
    templateUrl: './component-list.component.html'
})
export class ComponentListComponent extends PageBaseComponent
    implements OnInit {
    form: FormGroup;

    usernameIcon = 'access_time';
    constructor(private fb: FormBuilder) {
        super();
        setTimeout(() => {
            this.usernameIcon = 'adb';
        }, 3000);
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            username: ['ahihi']
        });

        this.form.valueChanges
            .pipe(distinctUntilChanged())
            .subscribe((value: any) => {
                console.log('form value', value);
            });
    }
}
