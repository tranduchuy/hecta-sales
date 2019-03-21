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
var widget_toggle_directive_1 = require("./widget-toggle.directive");
var FuseWidgetComponent = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {Renderer2} _renderer
     */
    function FuseWidgetComponent(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.flipped = false;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * After content init
     */
    FuseWidgetComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        // Listen for the flip button click
        setTimeout(function () {
            _this.toggleButtons.forEach(function (flipButton) {
                _this._renderer.listen(flipButton.elementRef.nativeElement, 'click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    _this.toggle();
                });
            });
        });
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Toggle the flipped status
     */
    FuseWidgetComponent.prototype.toggle = function () {
        this.flipped = !this.flipped;
    };
    __decorate([
        core_1.HostBinding('class.flipped'),
        __metadata("design:type", Object)
    ], FuseWidgetComponent.prototype, "flipped", void 0);
    __decorate([
        core_1.ContentChildren(widget_toggle_directive_1.FuseWidgetToggleDirective, { descendants: true }),
        __metadata("design:type", core_1.QueryList)
    ], FuseWidgetComponent.prototype, "toggleButtons", void 0);
    FuseWidgetComponent = __decorate([
        core_1.Component({
            selector: 'fuse-widget',
            templateUrl: './widget.component.html',
            styleUrls: ['./widget.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.Renderer2])
    ], FuseWidgetComponent);
    return FuseWidgetComponent;
}());
exports.FuseWidgetComponent = FuseWidgetComponent;
//# sourceMappingURL=widget.component.js.map