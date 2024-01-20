import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';

@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@Body() createBankDto: CreateBankDto, @GetUser() user) {
    return this.bankService.create(createBankDto, user.userId);
  }

  

  @UseGuards(AuthGuard("jwt"))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankService.findOne(+id);
  }

 

  
}
