"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const ejs_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/ejs.adapter");
const path_1 = require("path");
let MailerModule = class MailerModule {
};
exports.MailerModule = MailerModule;
exports.MailerModule = MailerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    return {
                        transport: {
                            service: 'gmail',
                            auth: {
                                user: configService.get('EMAIL_USER'),
                                pass: configService.get('EMAIL_PASS'),
                            },
                        },
                        defaults: {
                            from: `"Shoppie Collection" <${configService.get('EMAIL_USER')}>`,
                        },
                        template: {
                            dir: (0, path_1.join)(__dirname, '..', 'mail', 'templates'),
                            adapter: new ejs_adapter_1.EjsAdapter(),
                            options: {
                                strict: false,
                            },
                        },
                    };
                },
            }),
        ],
        exports: [mailer_1.MailerModule],
    })
], MailerModule);
//# sourceMappingURL=mailer.module.js.map