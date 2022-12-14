import { IsObject, IsString } from 'class-validator';

export class CreatePharmacyDto {
  @IsString()
  public designation: string;

  @IsObject()
  public contact?: Object;

  @IsObject()
  public status?: Object;

  @IsObject()
  public typePharmacy: Object;
}

export class uptadePharmacyDto {
  @IsString()
  public designation: string;

  @IsObject()
  public status?: Object;

  @IsObject()
  public typePharmacy: Object;
}
