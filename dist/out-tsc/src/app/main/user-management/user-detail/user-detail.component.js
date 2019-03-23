"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var page_base_component_1 = require("app/shared/components/base/page-base.component");
var forms_1 = require("@angular/forms");
var dialog_service_1 = require("app/shared/components/dialog/dialog.service");
var validator_service_1 = require("app/shared/services/validators/validator.service");
var animations_1 = require("@fuse/animations");
var progress_bar_service_1 = require("@fuse/components/progress-bar/progress-bar.service");
var user_service_1 = require("../shared/service/user.service");
var general_constant_1 = require("app/shared/constants/general.constant");
var UserDetailComponent = /** @class */ (function (_super) {
    __extends(UserDetailComponent, _super);
    function UserDetailComponent(fuseProgressBarService, fb, dialog, validatorService, userService) {
        var _this = _super.call(this) || this;
        _this.fuseProgressBarService = fuseProgressBarService;
        _this.fb = fb;
        _this.dialog = dialog;
        _this.validatorService = validatorService;
        _this.userService = userService;
        _this.isSuccess = true;
        _this.genderItemsSource = [
            {
                name: 'Nam',
                value: general_constant_1.General.Gender.GENDER_MALE
            },
            {
                name: 'Nữ',
                value: general_constant_1.General.Gender.GENDER_FEMALE
            }
        ];
        return _this;
    }
    UserDetailComponent.prototype.ngOnInit = function () {
        this.userForm = this.fb.group({
            name: ['', this.validatorService.getInputRequired()],
            birth: ['', this.validatorService.getInputRequired()],
            gender: [1],
            phone: ['0123456789'],
            email: ['huyphong@gmail.com'],
        });
    };
    UserDetailComponent.prototype.onRadioChange = function (event) {
        console.log('radio group change', event);
    };
    UserDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-user-detail',
            templateUrl: './user-detail.component.html',
            styleUrls: ['./user-detail.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None,
            animations: animations_1.fuseAnimations
        }),
        __metadata("design:paramtypes", [progress_bar_service_1.FuseProgressBarService,
            forms_1.FormBuilder,
            dialog_service_1.DialogService,
            validator_service_1.ValidatorService,
            user_service_1.UserService])
    ], UserDetailComponent);
    return UserDetailComponent;
}(page_base_component_1.PageBaseComponent));
exports.UserDetailComponent = UserDetailComponent;
//# sourceMappingURL=user-detail.component.js.map