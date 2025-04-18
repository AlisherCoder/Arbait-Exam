import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { CompanyDto, CreateAuthDto } from './create-auth.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateCompanyDto extends PartialType(CompanyDto) {}

export class UpdateAuthDto extends PartialType(
  PickType(CreateAuthDto, ['full_name', 'region_id']),
) {
  @ApiProperty({ type: UpdateCompanyDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateCompanyDto)
  company?: UpdateCompanyDto;
}
