import { Input, HostBinding, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export abstract class BaseComponent implements OnDestroy {
  @Input()
  @HostBinding('attr.data-id')
  id = '';
  
  @Input() isDisabled = false;
  @Input() isReadonly = false;
  @Input() placeholder = '';
  @Input() title = '';
  @Input() errors: string[] = [];

  @Output() gotFocus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output() lostFocus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  protected subscriptions: Subscription[] = [];

  onLostFocus(): void {}

  onFocus(): void {}

  ngOnDestroy(): void {
    this.unsubscribeAllSubscriptions(); 
  }

  private unsubscribeAllSubscriptions(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
