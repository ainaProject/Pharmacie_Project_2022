import {IsObject, IsString} from 'class-validator';
import {Pharmacy} from "@interfaces/pharmacy.interface";

export class CreateProductDto {

  @IsString()
  public designation?: string;

  @IsString()
  public description?: string;

  @IsObject ()
  pharmacy: Pharmacy;
}
