import { BadRequestException, Injectable } from '@nestjs/common';
import { BankService } from 'src/bank/bank.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { UtilsService } from 'src/utils/utils.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {

    constructor(
      readonly prismaService: PrismaService,
      readonly bankDetailsService: BankService,
      readonly utilsService: UtilsService,
      readonly userService: UserService

    ) { }
    
    async createUpaidPayment(createPaymentDto: CreatePaymentDto, userId: number) {
      const { amount , bankId} = createPaymentDto

      await this.bankDetailsService.findOne(bankId)

      return this.prismaService.payment.create({
        data: {
            transactionId: (await this.utilsService.generateRandomString()).hash,
            transactionStatus:'pending',
            amount,
          paymentStatus: 'unpaid',
            bankId
          }
      });
      
      
    }
  
  
    
    async findOne(transactionId: string) {
    const bankDetails = await this.prismaService.payment.findUnique({
      where: {
        transactionId        
      }
    });
    
    if (!bankDetails) {
      throw new BadRequestException("Payment record not found")
    }

    return bankDetails
    }
  
  async updatePaymentStatus(updatePaymentDto: UpdatePaymentDto) {
    
    const { transferedTo, bankId, nameOfBank, IBAN, transactionId, accountNumber } = updatePaymentDto
    await this.findOne(transactionId)
    const transaction = await this.prismaService.payment.update({
      where: {
        transactionId
      },
      data: {
        transferedTo,
        bankId,
        nameOfBank,
        transactionStatus:'successful',
        paymentStatus: 'paid',
        updatedAt: new Date(),
      }
    })

    return transaction
  }

  async findOneTransaction(transactionId: string, userId: number) {
    const userWithTransaction = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        bankAccounts: {
          include: {
            payments: {
              where: { transactionId: transactionId },
            },
          },
        },
      },
    });

    return userWithTransaction
  }
}
