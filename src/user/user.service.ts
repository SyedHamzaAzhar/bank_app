import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from "bcrypt";
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/utils/utils.service';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly utilsService: UtilsService

  ) { }
  
  getUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        isEmailVerified: true,
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const {email, password, firstName, lastName, phoneNumber,address} =  createUserDto
    const user = await this.getUserByEmail(email);

    if (user !== null && user.email && user.isEmailVerified) {
      throw new BadRequestException(
        "User with this email address already exists"
      );
    }

    if (user !== null && user.email && !user.isEmailVerified) {
     

      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message:
            "An account associated with this email address already exists, but email has not been verified yet",
          email: user.email,
        },
        HttpStatus.BAD_REQUEST
      );
    }


    return this.prismaService.user.create({
      data: {
        email,
        password: await this.utilsService.generateHash(password),
        firstName,
        lastName,
        phoneNumber,
        address

      },
       select: {
          firstName: true,
          lastName: true,
          email: true,
          isEmailVerified: true,
          phoneNumber: true,
          address: true,
          createdAt:true
        },
    })
  }


  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id
      }
    });

    if (!user) {
      throw new BadRequestException("User with this user id does not exists")
    }

    return user
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: { email },
      });
      return user;
    } catch (error) {
      throw new NotFoundException("User not found");
    }
  }

  async validateUser(credentials: {
    email: string;
    password: string;
  }): Promise<User> {
    let user: User;
    if (!credentials.email) {
      throw new BadRequestException("Must provide email");
    }
    if (
      credentials.email &&
      credentials.email !== null &&
      credentials.email !== undefined
    ) {
      user = await this.findUserByEmail(credentials.email);
      if (!user) {
        throw new NotFoundException("Email/Password incorrect");
      }
      const isMatch = await bcrypt.compare(credentials.password, user.password);
      if (!isMatch) {
        throw new BadRequestException("Password is incorrect");
      }
      if (!user.isEmailVerified) {
        throw new UnauthorizedException(
          "It seems your email address hasn't been verified yet. We've just sent a verification link to your registered email"
        );
      }
    }

    return user;
  }

  async verifyEmail(email: string, hash: string) {
    const user = await this.findUserByEmail(email);
    if (!user.hash) {
      throw new BadRequestException(
        "Your link is invalid or expired. Please try again"
      );
    }
    const isMatch = await bcrypt.compare(hash, user.hash);

    if (!isMatch) {
      throw new BadRequestException(
        "Your link is invalid or expired. Please try again"
      );
    }
    await this.prismaService.user.update({
      where: {
        email,
      },
      data: {
        hash: null,
        isEmailVerified: true,
      },
    });
    return { message: "Email verified successfully" };
  }

  

}
