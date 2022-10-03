import {IsEmail, IsObject, IsString} from 'class-validator';
import {Contact} from "@interfaces/contact.interface";
import {UserStatus} from "@interfaces/userStatus.interface";
import {Status} from "@interfaces/status.interface";
import {Pharmacy} from "@interfaces/pharmacy.interface";

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

  @IsObject()
  public userStatus: UserStatus;

  @IsObject()
  public status?: Status;

  @IsObject()
  public pharmacy?: Pharmacy;
}
