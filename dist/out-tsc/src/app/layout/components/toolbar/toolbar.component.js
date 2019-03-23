"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var core_2 = require("@ngx-translate/core");
var _ = require("lodash");
var config_service_1 = require("@fuse/services/config.service");
var sidebar_service_1 = require("@fuse/components/sidebar/sidebar.service");
var navigation_1 = require("app/navigation/navigation");
var auth_service_1 = require("../../../core/auth/auth.service");
var router_1 = require("@angular/router");
var ToolbarComponent = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    function ToolbarComponent(_fuseConfigService, _fuseSidebarService, _translateService, authService, _router, _activatedRoute) {
        this._fuseConfigService = _fuseConfigService;
        this._fuseSidebarService = _fuseSidebarService;
        this._translateService = _translateService;
        this.authService = authService;
        this._router = _router;
        this._activatedRoute = _activatedRoute;
        this.isChild = false;
        this.currentRoute = '';
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
        this.navigation = navigation_1.navigation;
        // Set the private defaults
        this._unsubscribeAll = new rxjs_1.Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ToolbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function (settings) {
            _this.horizontalNavbar = settings.layout.navbar.position === 'top';
            _this.rightNavbar = settings.layout.navbar.position === 'right';
            _this.hiddenNavbar = settings.layout.navbar.hidden === true;
        });
        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, { 'id': this._translateService.currentLang });
        //check is child
        // this._router.events.subscribe(url=>console.log(url.NavigationEnd));
        this.checkIsChild();
    };
    ToolbarComponent.prototype.checkIsChild = function () {
        // this._router.events.filter((event: any) => event instanceof NavigationEnd)
        // .subscribe((event: Router) => {
        //     this.currentRoute = event.url;
        //     console.log(this.currentRoute);
        //     console.log(ChildRoute.includes(this.currentRoute));
        //     // console.log(this._activatedRoute.root.firstChild.snapshot.data['level']);
        //     // if(ChildRoute.includes(this.currentRoute)){
        //     //     this.isChild = true;
        //     // }
        //     // else{
        //     //     this.isChild = false;
        //     // }
        var _this = this;
        // });
        this._router.events.pipe(operators_1.filter(function (event) { return event instanceof router_1.ActivationStart; }))
            .subscribe(function (event) {
            _this.level = console.log(event['snapshot'].data.level);
            _this.checkLevel();
        });
    };
    ToolbarComponent.prototype.checkLevel = function () {
        if (this.level == 1) {
            this.isChild = false;
        }
        else {
            this.isChild = true;
        }
    };
    /**
     * On destroy
     */
    ToolbarComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Toggle sidebar open
     *
     * @param key
     */
    ToolbarComponent.prototype.toggleSidebarOpen = function (key) {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    };
    /**
     * Search
     *
     * @param value
     */
    ToolbarComponent.prototype.search = function (value) {
        // Do your search here...
        console.log(value);
    };
    /**
     * Set the language
     *
     * @param lang
     */
    ToolbarComponent.prototype.setLanguage = function (lang) {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;
        // Use the selected language for translations
        this._translateService.use(lang.id);
    };
    ToolbarComponent.prototype.logout = function () {
        this.authService.logout();
    };
    ToolbarComponent = __decorate([
        core_1.Component({
            selector: 'toolbar',
            templateUrl: './toolbar.component.html',
            styleUrls: ['./toolbar.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [config_service_1.FuseConfigService,
            sidebar_service_1.FuseSidebarService,
            core_2.TranslateService,
            auth_service_1.AuthService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], ToolbarComponent);
    return ToolbarComponent;
}());
exports.ToolbarComponent = ToolbarComponent;
//# sourceMappingURL=toolbar.component.js.map