import { Decimal } from "@prisma/client/runtime/library";
import { IsDecimal, IsInt, IsString } from "class-validator";

export class UpdatePaymentDto {

    @IsString()
  transferedTo: string;
    
  @IsString()
  nameOfBank: string;
    
  @IsString()
  accountNumber: string;
    
  @IsString()
  IBAN: string;  
    
  @IsDecimal()
  amount: Decimal;
  
  @IsString()
  transactionId: string;
    
  @IsInt()
  bankId: number
}