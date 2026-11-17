import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Некоректний формат email' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(72)
  readonly password: string;
}
