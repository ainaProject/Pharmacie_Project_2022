import {IsNumber, IsObject, IsString} from 'class-validator';
import {Product} from "@interfaces/product.interface";

export class CreateStockDto {

  @IsObject ()
  product: Product;

  @IsNumber()
  public quantity?: number;
}
