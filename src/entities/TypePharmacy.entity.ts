import { IsEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PharmacyEntity } from '@entities/Pharmacy.entity';
import { TypePharmacy } from '@interfaces/TypePharmacy.interface';

@Entity()
export class TypePharmacyEntity extends BaseEntity implements TypePharmacy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmpty()
  designation: string;

  @Column()
  @IsEmpty()
  code: string;

  @OneToMany(() => PharmacyEntity, (pharmacy: PharmacyEntity) => pharmacy.typePharmacy)
  public pharmacy: PharmacyEntity[];
}
