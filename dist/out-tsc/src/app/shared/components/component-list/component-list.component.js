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
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var message_service_1 = require("../../services/message/message.service");
var validator_service_1 = require("../../services/validators/validator.service");
var page_base_component_1 = require("../base/page-base.component");
var dialog_service_1 = require("../dialog/dialog.service");
var ComponentListComponent = /** @class */ (function (_super) {
    __extends(ComponentListComponent, _super);
    function ComponentListComponent(fb, dialog, messageService, validatorService) {
        var _this = _super.call(this) || this;
        _this.fb = fb;
        _this.dialog = dialog;
        _this.messageService = messageService;
        _this.validatorService = validatorService;
        _this.usernameIcon = 'access_time';
        _this.radioGroupItemsSource = [
            {
                name: 'Male',
                value: 0
            },
            {
                name: 'Female',
                value: 1
            }
        ];
        _this.checkboxGroupItemsSource = [
            {
                name: 'District 1',
                value: 'd1'
            },
            {
                name: 'District 2',
                value: 'd2'
            },
            {
                name: 'District 3',
                value: 'd3'
            },
            {
                name: 'District 4',
                value: 'd4'
            }
        ];
        _this.cityItemsSource = [
            {
                name: 'Ho Chi Minh',
                value: 'hcm'
            },
            {
                name: 'Ha Noi',
                value: 'hn'
            }
        ];
        _this.autoCompleteItemsSource = [
            {
                name: 'Honda',
                value: 'honda'
            }, {
                name: 'Suzuki',
                value: 'suzuki'
            }, {
                name: 'Yamaha',
                value: 'yamaha'
            }
        ];
        _this.inputDate = {
            minDay: new Date(2018, 11, 1),
            maxDay: new Date(2019, 4, 1)
        };
        return _this;
    }
    ComponentListComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            username: ['', [this.validatorService.getInputRequired(), this.validatorService.getEmailPattern()]],
            password: [''],
            gender: [0],
            districts: [['d2'], [this.validatorService.getInputRequired()]],
            city: ['', [this.validatorService.getInputRequired()]],
            bike: ['', [this.validatorService.getInputRequired()]],
            date: [null, [this.validatorService.getInputRequired()]]
        });
        this.form.valueChanges
            .pipe(operators_1.distinctUntilChanged())
            .subscribe(function (value) {
            console.log('form value', value);
        });
        console.log(this.messageService.get('100'));
    };
    ComponentListComponent.prototype.onRadioChange = function (event) {
        console.log('radio group change', event);
    };
    ComponentListComponent.prototype.openDialogInfo = function () {
        this.dialog.openInfo('Test message')
            .subscribe(function (result) {
            console.log('dialog info result', result);
        });
    };
    ComponentListComponent.prototype.openDialogWarning = function () {
        this.dialog.openWarning('Test message?')
            .subscribe(function (result) {
            console.log('dialog info result', result);
        });
    };
    ComponentListComponent.prototype.openDialogConfirm = function () {
        this.dialog.openConfirm('Test message?')
            .subscribe(function (result) {
            console.log('dialog info result', result);
        });
    };
    ComponentListComponent = __decorate([
        core_1.Component({
            selector: 'app-component-list',
            templateUrl: './component-list.component.html',
            styleUrls: ['./component-list.component.scss'],
            providers: [dialog_service_1.DialogService]
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            dialog_service_1.DialogService,
            message_service_1.MessageService,
            validator_service_1.ValidatorService])
    ], ComponentListComponent);
    return ComponentListComponent;
}(page_base_component_1.PageBaseComponent));
exports.ComponentListComponent = ComponentListComponent;
//# sourceMappingURL=component-list.component.js.map