import { IsString } from 'class-validator';

export class CreateTypeActiveRoleDto {
  @IsString()
  public designation?: string;

  @IsString()
  public code?: string;
}
