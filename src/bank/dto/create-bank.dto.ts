import { IsDateString, IsString } from "class-validator";

export class CreateBankDto {
  
  @IsString()
  accountNumber: string;
    
  @IsString()
  IBAN: string;    
  
  @IsString()
  cardNumber: string; 
  
  @IsString()
  cvv: string;   
    
  @IsDateString()
  expiryDate: Date   

  @IsString()  
  bank: string;                        
}
