import { BadGatewayException, Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, VerifyEmailDto } from './dto/create-user.dto';
import { GetUser } from './get-user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
     const { password, confirmPassword } = createUserDto;

    if (password !== confirmPassword)
      throw new BadGatewayException("Password/ConfirmPassword must be same");

    return this.userService.create(createUserDto);
  }


  @UseGuards(AuthGuard("jwt"))
  @Get()
  findOne(@GetUser() user) {
    return this.userService.findOne(user.userId);
  }

  @Patch("verify/email")
  verifyEmail(@Body() data: VerifyEmailDto) {
    return this.userService.verifyEmail(data.email, data.hash);
  }

  
}
