import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';

@Module({
  imports:[PrismaModule],
  controllers: [BankController],
  providers: [BankService, PrismaService],
})
export class BankModule {}
