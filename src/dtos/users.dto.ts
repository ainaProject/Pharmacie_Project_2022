import {IsEmail, IsObject, IsString} from 'class-validator';
import {Contact} from "@interfaces/contact.interface";

export class CreateUserDto {

  @IsString()
  public name: string;

  @IsString()
  public first_name: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsObject()
  public contact?: Contact;
}
