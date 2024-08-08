import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: "Product's name" })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Product description' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ description: 'Product price' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @ApiProperty({ description: 'Product stock' })
  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @ApiProperty({ description: 'Product image URL' })
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @ApiProperty({ description: 'ID from Brand table' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly brandId: number;

  @ApiProperty({ description: 'List of category IDs' })
  @IsArray()
  @IsNotEmpty()
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @ApiProperty({ description: 'Filter limit' })
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiProperty({ description: 'Offset' })
  @IsOptional()
  @Min(0)
  offset: number;
}
