import { IsEmail, IsString } from 'class-validator';

export class CreateLoginDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
