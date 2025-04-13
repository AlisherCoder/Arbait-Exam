import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Company_Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'INN_Tax_Identification_Number' })
  @IsString()
  @IsNotEmpty()
  inn: string;

  @ApiProperty({ example: 'MFO_Bank_Code' })
  @IsString()
  @IsNotEmpty()
  mfo: string;

  @ApiProperty({ example: ' R-S_Bank_Account' })
  @IsString()
  @IsNotEmpty()
  rs: string;

  @ApiProperty({ example: 'Bank_Name' })
  @IsString()
  @IsNotEmpty()
  bank: string;

  @ApiProperty({ example: 'OKED_Business_Activity_Code' })
  @IsString()
  @IsNotEmpty()
  oked: string;

  @ApiProperty({ example: 'Company_Address' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'Company_Director_id' })
  @IsString()
  @IsNotEmpty()
  user_id: string;
}
