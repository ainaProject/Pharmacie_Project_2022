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
import {StatusEntity} from "@entities/Status.entity";
import {TypePharmacyEntity} from "@entities/TypePharmacy.entity";
import {Pharmacy} from "@interfaces/pharmacy.interface";
import {UserEntity} from "@entities/users.entity";

@Entity()
export class PharmacyEntity extends BaseEntity implements Pharmacy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  designation: string;

  @ManyToOne(() => ContactEntity, (contact: ContactEntity) => contact.pharmacy)
  public contact: ContactEntity;

  @ManyToOne(() => TypePharmacyEntity, (typePharmacy: TypePharmacyEntity) => typePharmacy.pharmacy)
  public typePharmacy: TypePharmacyEntity;

  @ManyToOne(() => StatusEntity, (status: StatusEntity) => status.pharmacy)
  public status: StatusEntity;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.pharmacy)
  public user: UserEntity[];
}
