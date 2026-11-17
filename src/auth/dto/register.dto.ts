import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Некоректний формат email' })
  @MaxLength(255)
  readonly email: string;

  @IsString()
  @MinLength(6, { message: 'Пароль має містити щонайменше 6 символів' })
  @MaxLength(72, { message: 'Пароль не може бути довшим за 72 символи' })
  @Matches(/(?=.*[A-Za-zА-Яа-яІіЇїЄєҐґ])(?=.*\d)/, {
    message: 'Пароль має містити хоча б одну літеру та одну цифру',
  })
  readonly password: string;
}
