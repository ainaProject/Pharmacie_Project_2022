import { IsEmail, IsObject, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public name: string;

  @IsString()
  public first_name: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsObject()
  public contact: Object;

  @IsObject()
  public userStatus: Object;

  @IsObject()
  public status?: Object;

  @IsObject()
  public pharmacy?: Object;
}

export class updateUserDto {
  @IsString()
  public name: string;

  @IsString()
  public first_name: string;

  @IsEmail()
  public email: string;

  @IsObject()
  public userStatus: Object;

  @IsObject()
  public status?: Object;

  @IsObject()
  public poste?: Object;
}
