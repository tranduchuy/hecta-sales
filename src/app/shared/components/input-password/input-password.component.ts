import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTextComponent } from '../input-text/input-text.component';

const INPUT_TEXT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputPasswordComponent),
  multi: true
};

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  providers: [INPUT_TEXT_VALUE_ACCESSOR]
})
export class InputPasswordComponent extends InputTextComponent implements OnInit {
  ngOnInit(): void {
    const input = this.el.nativeElement.querySelector('input');
    if (!input) {
      return;
    }

    input.type = 'password';
  }
}
