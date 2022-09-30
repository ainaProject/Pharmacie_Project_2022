import {IsNumber, IsObject} from 'class-validator';
import {Product} from "@interfaces/product.interface";

export class CreateThresholdDto {

  @IsObject ()
  product: Product;

  @IsNumber()
  public min: number;

  @IsNumber()
  public max: number;
}
