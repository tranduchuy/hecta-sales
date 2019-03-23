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
var material_1 = require("@angular/material");
var rxjs_1 = require("rxjs");
var confirm_dialog_component_1 = require("./confirm/confirm-dialog.component");
var info_dialog_component_1 = require("./info/info-dialog.component");
var warning_dialog_component_1 = require("./warning/warning-dialog.component");
var DialogResult;
(function (DialogResult) {
    DialogResult[DialogResult["OK"] = 0] = "OK";
    DialogResult[DialogResult["CANCEL"] = 1] = "CANCEL";
})(DialogResult = exports.DialogResult || (exports.DialogResult = {}));
var DialogService = /** @class */ (function () {
    function DialogService(dialog) {
        this.dialog = dialog;
    }
    DialogService.prototype.openInfo = function (message) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            var dialogRef = _this.dialog.open(info_dialog_component_1.InfoDialogComponent, {
                width: '250px',
                data: { message: message }
            });
            dialogRef.afterClosed().subscribe(function (value) {
                observer.next(value);
                observer.complete();
            });
        });
    };
    DialogService.prototype.openWarning = function (message) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            var dialogRef = _this.dialog.open(warning_dialog_component_1.WarningDialogComponent, {
                width: '250px',
                data: { message: message }
            });
            dialogRef.afterClosed().subscribe(function (value) {
                observer.next(value);
                observer.complete();
            });
        });
    };
    DialogService.prototype.openConfirm = function (message) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            var dialogRef = _this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
                width: '250px',
                data: { message: message }
            });
            dialogRef.afterClosed().subscribe(function (value) {
                observer.next(value);
                observer.complete();
            });
        });
    };
    DialogService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [material_1.MatDialog])
    ], DialogService);
    return DialogService;
}());
exports.DialogService = DialogService;
//# sourceMappingURL=dialog.service.js.map