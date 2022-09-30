import {IsString} from 'class-validator';

export class CreateTypePharmacyDto {

  @IsString()
  public designation?: string;

  @IsString()
  public code?: string;
}
