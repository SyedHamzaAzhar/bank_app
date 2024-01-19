import { IsEmail, IsNumber, IsString } from "class-validator";

export class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  SMTP_HOST: string;

  @IsNumber()
  SMTP_PORT: number;

  @IsString()
  SMTP_USERNAME: string;

  @IsString()
  SMTP_PASSWORD: string;

  @IsEmail()
  MAIL_FROM: string;

  @IsString()
  BASE_URL: string;
}
