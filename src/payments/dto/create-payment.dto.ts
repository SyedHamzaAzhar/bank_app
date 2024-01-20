import { Decimal } from "@prisma/client/runtime/library";
import { IsDecimal, IsInt } from "class-validator";

export class CreatePaymentDto{
    
  @IsDecimal()
  amount: Decimal;

  @IsInt()
  bankId: number;
  
  // @IsString()
  // transactionId: String;
    
}