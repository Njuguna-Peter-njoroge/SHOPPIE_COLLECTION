import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, UserRole } from 'generated/prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    private static isConnected;
    role: UserRole;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
