import { ConfigModule } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
