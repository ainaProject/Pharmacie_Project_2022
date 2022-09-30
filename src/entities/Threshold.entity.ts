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
import {StockEntity} from "@entities/Stock.entity";
import {Threshold} from "@interfaces/Threshold.interface";
import {ProductEntity} from "@entities/Product.entity";

@Entity()
export class ThresholdEntity extends BaseEntity implements Threshold {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.threshold)
  public product: ProductEntity;

  @Column()
  @IsNotEmpty()
  min: number;

  @Column()
  @IsNotEmpty()
  max: number;
}
