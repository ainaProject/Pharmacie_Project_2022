import {IsNumber, IsObject, IsString} from 'class-validator';
import {Pharmacy} from "@interfaces/pharmacy.interface";

export class CreateProductDto {

  @IsString()
  public designation: string;

  @IsNumber()
  public unit_price: number;

  @IsString()
  public description?: string;

  @IsObject ()
  pharmacy: Pharmacy;
}
