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
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../generated/prisma/client");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    static { PrismaService_1 = this; }
    logger = new common_1.Logger(PrismaService_1.name);
    static isConnected = false;
    role;
    constructor() {
        super({
            log: ['error', 'warn'],
        });
    }
    async onModuleInit() {
        try {
            if (!PrismaService_1.isConnected) {
                await this.$connect();
                PrismaService_1.isConnected = true;
                this.logger.log('Database connection established');
            }
        }
        catch (error) {
            this.logger.error('Failed to connect to database');
            this.logger.error(error);
            process.exit(1);
        }
    }
    async onModuleDestroy() {
        await this.$disconnect();
        PrismaService_1.isConnected = false;
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map