"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var core_2 = require("@ngx-translate/core");
var shared_module_1 = require("@fuse/shared.module");
var sample_component_1 = require("./sample.component");
var routes = [
    {
        path: 'sample',
        component: sample_component_1.SampleComponent
    }
];
var SampleModule = /** @class */ (function () {
    function SampleModule() {
    }
    SampleModule = __decorate([
        core_1.NgModule({
            declarations: [
                sample_component_1.SampleComponent
            ],
            imports: [
                router_1.RouterModule.forChild(routes),
                core_2.TranslateModule,
                shared_module_1.FuseSharedModule
            ],
            exports: [
                sample_component_1.SampleComponent
            ]
        })
    ], SampleModule);
    return SampleModule;
}());
exports.SampleModule = SampleModule;
//# sourceMappingURL=sample.module.js.map