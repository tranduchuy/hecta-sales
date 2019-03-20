import { Component, EventEmitter, Input, Output } from '@angular/core';
import {BaseComponent} from '../base/base.componen';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})

export class ButtonComponent extends BaseComponent {
  @Input() title = '';
  @Output() triggerClick = new EventEmitter<any>();

  onClickBtn(event: any) {
    this.triggerClick.emit();
  }
}
