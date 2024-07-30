import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'Correo electrónico de usuario' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: 'Contraseña del usuario' })
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Rol asignado al usuario' })
  readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
