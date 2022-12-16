import { IsObject, IsString } from 'class-validator';

export class CreatePosteDto {
  @IsString()
  public designation: string;

  @IsObject()
  public pharmacyId: Object;
}
