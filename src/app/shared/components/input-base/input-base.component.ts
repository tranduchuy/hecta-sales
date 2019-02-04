import { BaseComponent } from '../base/base.componen';
import { Input } from '@angular/core';

export abstract class InputTextBaseComponent extends BaseComponent {
    @Input() icon = '';
}
