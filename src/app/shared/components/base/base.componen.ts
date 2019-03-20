import { Input, HostBinding, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FocusEvent } from './focus-event';

export abstract class BaseComponent implements OnDestroy {
  @Input()
  @HostBinding('attr.data-id')
  id = '';

  @Input() isDisabled = false;
  @Input() isReadonly = false;
  @Input() placeholder = '';
  @Input() title = '';
  @Input() errors: string[] = [];
  @Input() classes = '';

  @Output() gotFocus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output() lostFocus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  protected subscriptions: Subscription[] = [];

  onLostFocus(): void {
    this.lostFocus.emit({target: this});
  }

  onFocus(event: any): void {
    this.gotFocus.emit(event);
  }

  ngOnDestroy(): void {
    this.unsubscribeAllSubscriptions();
  }

  private unsubscribeAllSubscriptions(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
