import { Component, Inject, OnDestroy, OnInit, isDevMode } from '@angular/core';
import { DOCUMENT, DecimalPipe } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Router } from '@angular/router';
import { navigation } from 'app/navigation/navigation';
import { locale as localeEN } from 'app/locale/en';
import { locale as localeVN } from 'app/locale/vi';
import { CookieService } from 'ngx-cookie-service';
import { TokenStorage } from './core/auth/token-storage.service';
import { UserService } from './main/user-management/shared/service/user.service';
import { MessagingService } from './shared/services/messaging/messaging.service';


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  providers: [TranslateService, DecimalPipe],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  fuseConfig: any;
  navigation: any;
  status = true;
  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(@Inject(DOCUMENT) private document: any,
    private _fuseConfigService: FuseConfigService,
    private _fuseNavigationService: FuseNavigationService,
    private _fuseSidebarService: FuseSidebarService,
    private _fuseSplashScreenService: FuseSplashScreenService,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private _translateService: TranslateService,
    private _platform: Platform,
    private _cookieService: CookieService,
    private _userService: UserService,
    private _messagingService: MessagingService,
    private _router: Router,
    private _decimalPipe: DecimalPipe) {
    this.initCookie();

    // Get default navigation
    this.navigation = navigation;

    // Register the navigation to the service
    this._fuseNavigationService.register('main', this.navigation);

    // Set the main navigation as our current navigation
    this._fuseNavigationService.setCurrentNavigation('main');

    // Add languages
    this._translateService.addLangs(['en', 'vi']);

    // Set the default language
    this._translateService.setDefaultLang('vi');

    // Set the navigation translations
    this._fuseTranslationLoaderService.loadTranslations(localeEN, localeVN);

    // Use a language
    this._translateService.use('vi');

    /**
     * ----------------------------------------------------------------------------------------------------
     * ngxTranslate Fix Start
     * ----------------------------------------------------------------------------------------------------
     */

    /**
     * If you are using a language other than the default one, i.e. Turkish in this case,
     * you may encounter an issue where some of the components are not actually being
     * translated when your app first initialized.
     *
     * This is related to ngxTranslate module and below there is a temporary fix while we
     * are moving the multi language implementation over to the Angular's core language
     * service.
     **/

    // Set the default language to 'en' and then back to 'tr'.
    // '.use' cannot be used here as ngxTranslate won't switch to a language that's already
    // been selected and there is no way to force it, so we overcome the issue by switching
    // the default language back and forth.
    /**
     setTimeout(() => {
            this._translateService.setDefaultLang('en');
            this._translateService.setDefaultLang('tr');
         });
     */

    /**
     * ----------------------------------------------------------------------------------------------------
     * ngxTranslate Fix End
     * ----------------------------------------------------------------------------------------------------
     */

    // Add is-mobile class to the body if the platform is mobile
    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {

        this.fuseConfig = config;

        // Boxed
        if (this.fuseConfig.layout.width === 'boxed') {
          this.document.body.classList.add('boxed');
        }
        else {
          this.document.body.classList.remove('boxed');
        }

        // Color theme - Use normal for loop for IE11 compatibility
        for (let i = 0; i < this.document.body.classList.length; i++) {
          const className = this.document.body.classList[i];

          if (className.startsWith('theme-')) {
            this.document.body.classList.remove(className);
          }
        }

        this.document.body.classList.add(this.fuseConfig.colorTheme);
      });

    //update navigation
    this.updateNavigation();
  }

  updateNavigation() {

    let data;
    this._userService.userInfo$()
      .subscribe((res: any)=>{
        data = res.balance;
      });

    // Update the badge title
    this._fuseNavigationService.updateNavigationItem('main-account-1', {
      badge: {
        title: this._decimalPipe.transform(data.main1,'.0-2')+'đ'
      }
    });

    this._fuseNavigationService.updateNavigationItem('main-account-2', {
      badge: {
        title: this._decimalPipe.transform(data.main2,'.0-2')+'đ'
      }
    });

    this._fuseNavigationService.updateNavigationItem('promotion-account', {
      badge: {
        title: this._decimalPipe.transform(data.promo,'.0-2')+'đ'
      }
    });

    this._fuseNavigationService.updateNavigationItem('credit-account', {
      badge: {
        title: this._decimalPipe.transform(data.sharedCredit,'.0-2')+'đ'
      }
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  initCookie(): void {
    const accessToken = this._cookieService.get('accessToken');
    if (!accessToken) {
      this._router.navigate(['auth/login']);
      return;
    }
  }
}
