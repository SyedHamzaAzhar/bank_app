import { IsOptional, IsString, Length } from "class-validator";

export class LoginUserDto {
  
  @IsString()
  @Length(5, 127)
  @IsOptional()
  email: string;

  @IsString()
  @Length(5, 10)
  @IsOptional()
  npiNumber: string;

  @IsString()
  @Length(1, 255)
  password: string;
}
