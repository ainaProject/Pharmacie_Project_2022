import {IsEmpty, IsNotEmpty} from 'class-validator';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, OneToMany
} from 'typeorm';
import { User } from '@interfaces/users.interface';
import {Contact} from "swagger-jsdoc";
import {ContactEntity} from "@entities/Contact.entity";
import {Role} from "@interfaces/role.interface";
import {UserEntity} from "@entities/users.entity";

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
