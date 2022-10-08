import {IsNumber, IsObject, IsString} from 'class-validator';
import {TypeMovement} from "@interfaces/TypeMovement.interface";
import {User} from "@interfaces/users.interface";
import {Status} from "@interfaces/status.interface";

export class CreateMovementDto {

  @IsString()
  public motif: string;

  @IsObject ()
  typeMovement: TypeMovement;

  @IsObject ()
  send: User;

  @IsObject ()
  receiver: User;

  @IsObject ()
  status: Status;
}
