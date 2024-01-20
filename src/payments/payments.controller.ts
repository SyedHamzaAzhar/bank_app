import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }
  
  @UseGuards(AuthGuard("jwt"))
  @Post()
  createUnpaidPayment(@Body() createPaymentDto: CreatePaymentDto, @GetUser() user) {
    return this.paymentsService.createUpaidPayment(createPaymentDto, user.userId);
   }
  
  @UseGuards(AuthGuard("jwt"))
  @Get(':transactionId')
  findOne(@Param('transactionId') transactionId: string) {
    return this.paymentsService.findOne(transactionId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch('update')
  updateTransaction(@Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.updatePaymentStatus(updatePaymentDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get(':transactionId')
  findUsersTransaction(@Param('transactionId') transactionId: string, @GetUser() user) {
    return this.paymentsService.findOneTransaction(transactionId, user.userId);
  }


}
