import {IsString} from 'class-validator';

export class CreateTypeMovementDto {

  @IsString()
  public designation?: string;

  @IsString()
  public code?: string;
}
