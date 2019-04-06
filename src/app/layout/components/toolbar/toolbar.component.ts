import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import {takeUntil, filter} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import * as _ from 'lodash';

import {FuseConfigService} from '@fuse/services/config.service';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';

import {navigation} from 'app/navigation/navigation';
import {AuthService} from '../../../core/auth/auth.service';
import {Router, ActivationStart} from '@angular/router';
import { UserService } from 'app/main/user-management/shared/service/user.service';
import { environment } from 'environments/environment.hmr';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {

  isChild: Boolean;
  currentRouteLevel: any;

  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  languages: any;
  navigation: any;
  selectedLanguage: any;
  userStatusOptions: any[];

  userName: any;
  avatar: string = '';

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {TranslateService} _translateService
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fuseSidebarService: FuseSidebarService,
    private _translateService: TranslateService,
    private _authService: AuthService,
    private _router: Router,
    private _location: Location,
    private _userService: UserService
  ) {
    // Set the defaults
    this.userStatusOptions = [
      {
        'title': 'Online',
        'icon': 'icon-checkbox-marked-circle',
        'color': '#4CAF50'
      },
      {
        'title': 'Away',
        'icon': 'icon-clock',
        'color': '#FFC107'
      },
      {
        'title': 'Do not Disturb',
        'icon': 'icon-minus-circle',
        'color': '#F44336'
      },
      {
        'title': 'Invisible',
        'icon': 'icon-checkbox-blank-circle-outline',
        'color': '#BDBDBD'
      },
      {
        'title': 'Offline',
        'icon': 'icon-checkbox-blank-circle-outline',
        'color': '#616161'
      }
    ];

    this.languages = [
      {
        id: 'en',
        title: 'English',
        flag: 'us'
      },
      {
        id: 'vi',
        title: 'Vietnam',
        flag: 'vi'
      }
    ];

    this.navigation = navigation;

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
    // Subscribe to the config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((settings) => {
        this.horizontalNavbar = settings.layout.navbar.position === 'top';
        this.rightNavbar = settings.layout.navbar.position === 'right';
        this.hiddenNavbar = settings.layout.navbar.hidden === true;
      });

    // Set the selected language from default languages
    this.selectedLanguage = _.find(this.languages, {'id': this._translateService.currentLang});

    //check is child
    this.checkThisRouteIsChild();

    //update toolbar user info
    this.getUserInfo();
  }

  getUserInfo(): void
  {
    this._userService.userInfo$().subscribe(
      (res: any) =>
      {
        this.userName = res.name;
        this.avatar = `${environment.staticImageSize}150x150/${res.avatar}`;
      }
    )
  }

  checkThisRouteIsChild(): void
  {
    this._router.events.pipe(
      filter((event: any) => event instanceof ActivationStart)
    )
      .subscribe((event: any) => {
        this.currentRouteLevel = event['snapshot'].data.level;
        this.checkThisRouteLevel();
      });

  }

  checkThisRouteLevel(): void
  {
    if (this.currentRouteLevel === 1) {
      this.isChild = false;
    } else {
      this.isChild = true;
    }
  }

  toggleBack(): void 
  {
    this._location.back();
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

  /**
   * Search
   *
   * @param value
   */
  search(value): void {
    // Do your search here...
    console.log(value);
  }

  /**
   * Set the language
   *
   * @param lang
   */
  setLanguage(lang): void {
    // Set the selected language for the toolbar
    this.selectedLanguage = lang;

    // Use the selected language for translations
    this._translateService.use(lang.id);
  }

  logout(): void {
    this._authService.logout();
  }
}
