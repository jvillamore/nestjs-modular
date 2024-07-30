import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Descripción del producto' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ description: 'Precio del producto' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @ApiProperty({ description: 'Stock del producto' })
  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @ApiProperty({ description: 'URL de la imagen del producto' })
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
