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
import {Product} from "@interfaces/product.interface";
import {PharmacyEntity} from "@entities/Pharmacy.entity";

@Entity()
export class ProductEntity extends BaseEntity implements Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  designation: string;

  @Column()
  @IsEmpty()
  description: string;

  @ManyToOne(() => PharmacyEntity, (pharmacy: PharmacyEntity) => pharmacy.product)
  public pharmacy: PharmacyEntity;

}
