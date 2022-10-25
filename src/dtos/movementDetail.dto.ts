import { IsEmail, IsNumber, IsObject, IsString } from 'class-validator';
import { Movement } from '@interfaces/movement.interface';
import { Product } from '@interfaces/product.interface';

export class CreateMovementDetailDtoDto {
  @IsObject()
  public movement: Movement;

  @IsObject()
  public product: Product;

  @IsNumber()
  public number: number;
}
