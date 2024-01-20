import { Module } from '@nestjs/common';
import { BankModule } from 'src/bank/bank.module';
import { BankService } from 'src/bank/bank.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { UtilsModule } from 'src/utils/utils.module';
import { UtilsService } from 'src/utils/utils.service';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  imports:[PrismaModule, BankModule, UtilsModule, UserModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, PrismaService, BankService, UtilsService, UserService],
})
export class PaymentsModule {}
