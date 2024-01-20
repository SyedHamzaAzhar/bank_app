import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBankDto } from './dto/create-bank.dto';

@Injectable()
export class BankService {
  constructor(
    readonly prismaService: PrismaService
  ){}
  create(createBankDto: CreateBankDto, userId: number) {
    const {accountNumber, IBAN, cardNumber, cvv, expiryDate, bank } = createBankDto
    return this.prismaService.bankAccountDetails.create({
      data: {
        userId,
        accountNumber,
        IBAN,
        cardNumber,
        cvv,
        expiryDate,
        bank
      }
    });
  }

  
  async findOne(id: number) {
    const bankDetails = await this.prismaService.bankAccountDetails.findUnique({
      where: {
        id
      }
    });
    
    if (!bankDetails) {
      throw new BadRequestException("Bank details not found")
    }

    return bankDetails
  }

  
}
