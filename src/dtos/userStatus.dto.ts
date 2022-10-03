import {IsString} from 'class-validator';

export class CreateUserStatusDto {

  @IsString()
  public designation?: string;

  @IsString()
  public code?: string;
}
