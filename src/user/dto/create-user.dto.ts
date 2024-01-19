import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  
  @IsEmail()
  @Length(5, 127)
  email: string;

  @IsString()
  @Length(8, 255)
  password: string;
    
@IsString()
firstName: string;
    
@IsString()
lastName: string;
    
@IsString()
phoneNumber: string;

@IsString()
address: string;

@IsString()
@Length(8, 255)
confirmPassword: string;
}