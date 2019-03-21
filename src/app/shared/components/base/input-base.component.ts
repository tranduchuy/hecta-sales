import { BaseComponent } from './base.componen';
import { ElementRef, Input } from '@angular/core';

export abstract class InputTextBaseComponent extends BaseComponent {
  @Input() icon = '';
}
