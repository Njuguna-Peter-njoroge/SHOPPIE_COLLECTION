import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    this.transporter = nodemailer.createTransport({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      host: this.configService.get('SMTP_HOST'),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      port: this.configService.get('SMTP_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        user: this.configService.get('SMTP_USER'),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        pass: this.configService.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const mailOptions = {
      from: `"Shoppie Collection" <${this.configService.get('SMTP_FROM')}>`,
      to: email,
      subject: 'Welcome to Shoppie Collection!',
      html: `
        <h1>Welcome to Shoppie Collection, ${name}!</h1>
        <p>We're excited to have you on board.</p>
        <p>Start exploring our collection and find your perfect items!</p>
        <br>
        <p>Best regards,</p>
        <p>The Shoppie Collection Team</p>
      `,
    };

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw error;
    }
  }
}
