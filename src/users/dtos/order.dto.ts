import { IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
export class CreateOrderDto {
  @IsPositive()
  @ApiProperty({ description: 'ID from Custormer table' })
  readonly customerId: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
