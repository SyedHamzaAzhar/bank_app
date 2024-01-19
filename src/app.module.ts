import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { EnvironmentVariables } from './env.validation';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { UtilsModule } from './utils/utils.module';
import { BankModule } from './bank/bank.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
  }),
    UserModule,
    PrismaModule,
    AuthModule,
    UtilsModule,
    EmailModule,
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        transport: {
          host: configService.get("SMTP_HOST"),
          port: configService.get("SMTP_PORT"),
          secure: false,
          auth: {
            user: configService.get("SMTP_USERNAME"),
            pass: configService.get("SMTP_PASSWORD"),
          },
        },
        defaults: {
          from: '"Referral Alley" <noreply@invotyx.com>',
        },
      }),
      inject: [ConfigService],
    }),
    BankModule,
    PaymentsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
