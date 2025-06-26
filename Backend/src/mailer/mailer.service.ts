import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: this.configService.get<string>('SMTP_SECURE') === 'true',
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    });
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const templatePath = path.join(
      __dirname,
      '..',
      'templates',
      'email',
      'welcome.hbs', // .hbs file
    );

    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = handlebars.compile(templateSource);

    const html = compiledTemplate({
      name,
      storeName: 'Shoppie Collection',
      loginUrl: 'http://localhost:4200/login',
      supportEmail: 'njugunahpeternjoroge@gmail.com',
      currentYear: new Date().getFullYear(),
    });

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Shoppie Collection" <${this.configService.get('SMTP_FROM')}>`,
      to: email,
      subject: 'Welcome to Shoppie Collection!',
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('❌ Error sending welcome email:', error);
      throw new Error('Failed to send welcome email');
    }
  }
}
