import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'User email' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: 'User password' })
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'User role' })
  readonly role: string;

  @IsPositive()
  @IsOptional()
  @ApiProperty({ description: 'ID from Custormer table' })
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
