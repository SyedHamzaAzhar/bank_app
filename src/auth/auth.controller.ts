import { Body, Controller, Patch, Post, Query } from "@nestjs/common";
import { AuthService } from './auth.service';
import { LoginUserDto } from "src/user/dto/login-user.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

   @Post("login")
  async validateUser(
    @Body() loginUserDto: LoginUserDto
  ): Promise<{ accessToken: string }> {
    const validate = await this.authService.validateUser(loginUserDto);
    return validate;
  }

  @Patch("reset-password-email")
  sendResetPasswordEmail(@Query("email") email: string) {
    return this.authService.sendForgotPasswordEmail(email);
  }

  @Post("verify-email")
  sendVerificationEmail(@Query("email") email: string) {
    return this.authService.sendVerificationEmail(email);
  }
}
