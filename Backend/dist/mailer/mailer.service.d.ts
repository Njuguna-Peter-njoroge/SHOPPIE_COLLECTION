import { ConfigService } from '@nestjs/config';
export declare class MailerService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendWelcomeEmail(email: string, name: string): Promise<void>;
}
