"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemModule = void 0;
const common_1 = require("@nestjs/common");
const cartitem_service_1 = require("./cartitem.service");
const cartitem_controller_1 = require("./cartitem.controller");
let CartItemModule = class CartItemModule {
};
exports.CartItemModule = CartItemModule;
exports.CartItemModule = CartItemModule = __decorate([
    (0, common_1.Module)({
        providers: [cartitem_service_1.CartItemService],
        controllers: [cartitem_controller_1.CartItemController],
    })
], CartItemModule);
//# sourceMappingURL=cartitem.module.js.map