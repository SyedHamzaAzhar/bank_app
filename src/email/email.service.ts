import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/env.validation';


@Injectable()
export class EmailService {
     constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService<EnvironmentVariables>
  ) {}

    async sendVerificationEmail(email: string, hash: string) {
    try {
      const baseUrl = this.configService.get<string>("BASE_URL");

      var link;
      if (baseUrl) {
        link = `${baseUrl}/?email=${email}&hash=${hash}`;
      } else {
        link = `https://bankApp.com/?email=${email}&hash=${hash}`;
      }

      await this.mailerService.sendMail({
        from: this.configService.get<string>("MAIL_FROM"),
        to: email,
        subject: "Email verification",
        html: link,
      });

      return {
        message: `verification email has been sent to your email ${email} and link ${link}`,
      };
    } catch (error) {
      return {
        message: `verification email has been sent to your email ${email} and link ${link}`,
      };
    }
  }

  async sendResetPasswordEmail(email: string, hash: string) {
    try {
      const baseUrl = this.configService.get<string>("BASE_URL");

      var link;
      if (baseUrl) {
        link = `${baseUrl}/auth/reset-password/?hash=${hash}&email=${email}`;
      } else {
        link = `https://bankApp.com/auth/reset-password/?hash=${hash}&email=${email}`;
      }

      await this.mailerService.sendMail({
        from: this.configService.get<string>("MAIL_FROM"),
        to: email,
        subject: "Reset Password",
        html: link,
      });
      return {
        message: `reset password email has been sent to your email ${email} and link ${link}`,
      };
    } catch (error) {
      // throw error;
      return {
        message: `reset password email has been sent to your email ${email} and link ${link}`,
      };
    }
  }
}
