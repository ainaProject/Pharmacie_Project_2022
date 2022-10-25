import { IsEmail, IsObject, IsString } from 'class-validator';

export class CreateContactDto {
  @IsEmail()
  public email?: string;

  @IsString()
  public telephone?: string;

  @IsString()
  public location?: string;

  @IsString()
  public altitude?: string;

  @IsString()
  public longitude?: string;

  @IsString()
  public country?: string;
}
