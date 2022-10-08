import {IsEmail, IsNumber, IsObject, IsString} from 'class-validator';
import {Movement} from "@interfaces/movement.interface";

export class CreateMovementInvoiceDto {
  @IsObject()
  movement: Movement;

  @IsNumber()
  sumTotal: number;
}
