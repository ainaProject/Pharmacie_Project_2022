import {IsEmail, IsObject, IsString} from 'class-validator';

export class CreateRoleDto {

  @IsString()
  public designation?: string;

  @IsString()
  public code?: string;
}
