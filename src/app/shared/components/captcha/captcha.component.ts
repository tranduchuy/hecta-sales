import {
  AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnInit,
  Output
} from '@angular/core';

declare const grecaptcha: any;

declare global {
  interface Window {
    grecaptcha: any;
    reCaptchaLoad: () => void;
  }
}

export interface ReCaptchaConfig {
  theme?: 'dark' | 'light';
  type?: 'audio' | 'image';
  size?: 'compact' | 'normal';
  tabindex?: number;
}

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html'
})
export class CaptchaComponent implements OnInit, AfterViewInit {
  @Input() errors = [];
  @Input() config: ReCaptchaConfig = {};
  @Input() lang: string = 'vi';

  @Output() catchToken = new EventEmitter<string>();

  private widgetId: number;

  constructor(private element: ElementRef,
              private ngZone: NgZone,
              @Inject('API_GOOGLE_CAPTCHA_TOKEN') private key) {}

  onExpired() {
    this.ngZone.run(() => {
    });
  }

  onSuccess(token: string) {
    this.ngZone.run(() => {
      this.catchToken.emit(token);
    });
  }

  ngOnInit() {
    this.registerReCaptchaCallback();
    this.addScript();
  }

  ngAfterViewInit() {}

  registerReCaptchaCallback() {
    window.reCaptchaLoad = () => {
      const config = {
        ...this.config,
        'sitekey': this.key,
        'callback': this.onSuccess.bind(this),
        'expired-callback': this.onExpired.bind(this)
      };
      this.widgetId = this.render(this.element.nativeElement.querySelector('div:first-child'), config);
    };
  }

  private render(element: HTMLElement, config): number {
    return grecaptcha.render(element, config);
  }
o
  addScript() {
    const script = document.createElement('script');
    const lang = this.lang ? '&hl=' + this.lang : '';
    script.src = `https://www.google.com/recaptcha/api.js?onload=reCaptchaLoad&render=explicit${lang}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

}
