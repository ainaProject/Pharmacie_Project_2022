import {IsObject} from 'class-validator';
import {TypeActiveRole} from "@interfaces/TypeActiveRole.interface";
import {User} from "@interfaces/users.interface";

export class CreateActiveRoleDto {

  @IsObject()
  public typeActiveRole: TypeActiveRole;

  @IsObject()
  public user: User;
}
