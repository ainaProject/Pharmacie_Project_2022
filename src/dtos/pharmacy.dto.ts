import {IsEmail, IsObject, IsString} from 'class-validator';
import {Contact} from "@interfaces/contact.interface";
import {Status} from "@interfaces/status.interface";
import {TypePharmacy} from "@interfaces/TypePharmacy.interface";

export class CreatePharmacyDto {

  @IsString()
  public designation: string;

  @IsObject()
  public contact?: Contact;

  @IsObject()
  public status?: Status;

  @IsObject()
  public typePharmacy?: TypePharmacy;
}
