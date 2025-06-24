/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient, UserRole } from 'generated/prisma/client';

// const prisma = new PrismaClient();

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  private static isConnected = false;
  role: UserRole;
  constructor() {
    super({
      log: ['error', 'warn'],
    });
  }

  async onModuleInit() {
    try {
      if (!PrismaService.isConnected) {
        await this.$connect();
        PrismaService.isConnected = true;
        this.logger.log('Database connection established');
      }
    } catch (error) {
      this.logger.error('Failed to connect to database');
      this.logger.error(error);
      process.exit(1);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    PrismaService.isConnected = false;
  }
}
