import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class AuthService {

    constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly utilsService: UtilsService,
    private readonly emailService: EmailService,


  ) {}

    async login(user: User): Promise<{ accessToken: string }> {
    const payload = {
      userId: user.id,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async validateUser(
    loginUserDto: LoginUserDto
  ): Promise<{ accessToken: string }> {
    const user: User = await this.usersService.validateUser(loginUserDto);
    return this.login(user);
  }

  async sendForgotPasswordEmail(email: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException(
        `User with email address ${email} does not exists`
      );
    }

    const { hash, encryptedHash } =
      await this.utilsService.generateRandomString();

    const findUser = await this.prismaService.user.update({
      where: {
        email: user.email,
      },
      data: {
        hash: encryptedHash,
      },
    });

    return this.emailService.sendResetPasswordEmail(user.email, hash);
  }

  async sendVerificationEmail(email: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException(
        `User with email address ${email} does not exists`
      );
    }

    if (user && user.apiCount < 3) {
      const { hash, encryptedHash } =
        await this.utilsService.generateRandomString();

      await this.prismaService.user.update({
        where: {
          email: user.email,
        },
        data: {
          hash: encryptedHash,
          apiCount: user.apiCount + 1,
        },
      });
      return this.emailService.sendVerificationEmail(user.email, hash);
    }
    throw new BadRequestException("You have reached max re-tries limit");
  }

}
