"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var PageBaseComponent = /** @class */ (function () {
    function PageBaseComponent() {
        this.subscriptions = [];
    }
    PageBaseComponent.prototype.getErrorMessages = function (form) {
        var _this = this;
        var controlNames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            controlNames[_i - 1] = arguments[_i];
        }
        var errors = [];
        controlNames.forEach(function (name) {
            errors = errors.concat(_this.getErrorMessagesFromControlName(form, name));
        });
        return errors;
    };
    PageBaseComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) {
            if (subscription) {
                subscription.unsubscribe();
            }
        });
    };
    PageBaseComponent.prototype.openWarningDialog = function () {
        return rxjs_1.of();
    };
    PageBaseComponent.prototype.openInfoDialog = function () {
        return rxjs_1.of();
    };
    PageBaseComponent.prototype.openConfirmDialog = function () {
        return rxjs_1.of();
    };
    PageBaseComponent.prototype.markAsTouchedForAll = function (formGroup) {
        var _this = this;
        Object.keys(formGroup.controls).forEach(function (field) {
            var control = formGroup.get(field);
            if (control instanceof forms_1.FormControl) {
                control.markAsTouched({ onlySelf: true });
            }
            else if (control instanceof forms_1.FormGroup) {
                _this.markAsTouchedForAll(control);
            }
            else if (control instanceof forms_1.FormArray) {
                control.controls.forEach(function (innerFormGroup) {
                    if (innerFormGroup instanceof forms_1.FormGroup) {
                        _this.markAsTouchedForAll(innerFormGroup);
                    }
                });
            }
        });
    };
    PageBaseComponent.prototype.markAsUntouchedForAll = function (formGroup) {
        var _this = this;
        Object.keys(formGroup.controls).forEach(function (field) {
            var control = formGroup.get(field);
            if (control instanceof forms_1.FormControl) {
                control.markAsUntouched({ onlySelf: true });
            }
            else if (control instanceof forms_1.FormGroup) {
                _this.markAsUntouchedForAll(control);
            }
            else if (control instanceof forms_1.FormArray) {
                control.controls.forEach(function (innerFormGroup) {
                    if (innerFormGroup instanceof forms_1.FormGroup) {
                        _this.markAsUntouchedForAll(innerFormGroup);
                    }
                });
            }
        });
    };
    PageBaseComponent.prototype.markAsPristineForAll = function (formGroup) {
        var _this = this;
        Object.keys(formGroup.controls).forEach(function (field) {
            var control = formGroup.get(field);
            if (control instanceof forms_1.FormControl) {
                control.markAsPristine({ onlySelf: true });
            }
            else if (control instanceof forms_1.FormGroup) {
                _this.markAsPristineForAll(control);
            }
            else if (control instanceof forms_1.FormArray) {
                control.controls.forEach(function (innerFormGroup) {
                    if (innerFormGroup instanceof forms_1.FormGroup) {
                        _this.markAsPristineForAll(innerFormGroup);
                    }
                });
            }
        });
    };
    PageBaseComponent.prototype.getErrorMessagesFromControlName = function (form, ctrlName) {
        var control = form.controls[ctrlName];
        return this.getSingleErrorMessages(control);
    };
    PageBaseComponent.prototype.getSingleErrorMessages = function (control) {
        var sErr = [];
        if (!control.valid && control.touched && control.errors) {
            sErr = Object.values(control.errors);
        }
        return sErr;
    };
    return PageBaseComponent;
}());
exports.PageBaseComponent = PageBaseComponent;
//# sourceMappingURL=page-base.component.js.map