"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = require("path");
const app_service_1 = require("./app.service");
const users_module_1 = require("./Users/users.module");
const users_service_1 = require("./Users/users.service");
const prisma_module_1 = require("./prisma/prisma.module");
const products_module_1 = require("./products/products.module");
const cartitem_module_1 = require("./cartitem/cartitem.module");
const auth_controller_1 = require("./auth/auth.controller");
const auth_module_1 = require("./auth/auth.module");
const auth_service_1 = require("./auth/auth.service");
const jwtconfig_module_1 = require("./jwtconfig/jwtconfig.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary/cloudinary.module");
const cloudinary_service_1 = require("./cloudinary/cloudinary.service");
const cloudinary_controller_1 = require("./cloudinary/cloudinary.controller");
const mailer_service_1 = require("./mailer/mailer.service");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.MAIL_HOST,
                    secure: false,
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASSWORD,
                    },
                },
                defaults: {
                    from: '"No Reply" <noreply@example.com>',
                },
                template: {
                    dir: (0, path_1.join)(__dirname, 'templates'),
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            users_module_1.UsersModule,
            prisma_module_1.PrismaModule,
            products_module_1.ProductsModule,
            cartitem_module_1.CartItemModule,
            auth_module_1.AuthModule,
            jwtconfig_module_1.JwtconfigModule,
            jwtconfig_module_1.JwtconfigModule,
            cloudinary_module_1.CloudinaryModule,
            mailer_1.MailerModule,
        ],
        providers: [
            app_service_1.AppService,
            users_service_1.UsersService,
            auth_service_1.AuthService,
            cloudinary_service_1.CloudinaryService,
            mailer_service_1.MailerService,
        ],
        controllers: [auth_controller_1.AuthController, cloudinary_controller_1.CloudinaryController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map