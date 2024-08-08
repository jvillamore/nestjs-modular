import { IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Unique ID from Item-Order table',
  })
  readonly orderId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Unique ID from Product table',
  })
  readonly productId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Product quantity',
  })
  readonly quantity: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
