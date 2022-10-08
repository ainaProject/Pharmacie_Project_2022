import {IsNumber, IsObject, IsString} from 'class-validator';
import {Pharmacy} from "@interfaces/pharmacy.interface";
import {Category} from "@interfaces/category.interface";

export class CreateProductDto {

  @IsString()
  public designation: string;

  @IsObject()
  public category: Category;

  @IsNumber()
  public unit_price: number;

  @IsString()
  public description?: string;

  @IsObject ()
  pharmacy: Pharmacy;
}
