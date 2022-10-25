import { IsString } from 'class-validator';

export class CreateStatusDto {
  @IsString()
  public designation?: string;

  @IsString()
  public code?: string;
}
