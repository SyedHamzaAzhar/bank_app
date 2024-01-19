import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsModule } from 'src/utils/utils.module';
import { UtilsService } from 'src/utils/utils.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports:[ PrismaModule, UtilsModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, UtilsService],
})
export class UserModule {}
