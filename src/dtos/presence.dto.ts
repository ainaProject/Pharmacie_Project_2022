import {IsObject, IsString} from "class-validator";
import {User} from "@interfaces/users.interface";

export class CreatePresenceDto {
  @IsObject()
  user: User;

  @IsString()
  startHourly: string;

  @IsString()
  endHourly: string;

  @IsString()
  activeDay: string;

  @IsString()
  activeMonth: string;

  @IsString()
  activeYear: string;
}
