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
import {UserEntity} from "@entities/users.entity";
import {Status} from "@interfaces/status.interface";
import {PharmacyEntity} from "@entities/Pharmacy.entity";

@Entity()
export class StatusEntity extends BaseEntity implements Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmpty()
  designation: string;

  @Column()
  @IsEmpty()
  code: string;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.status)
  public user: UserEntity[];

  @OneToMany(() => PharmacyEntity, (pharmacy: PharmacyEntity) => pharmacy.status)
  public pharmacy: PharmacyEntity[];
}
