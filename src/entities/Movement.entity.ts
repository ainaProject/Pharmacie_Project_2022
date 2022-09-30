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
import {ThresholdEntity} from "@entities/Threshold.entity";
import {Movement} from "@interfaces/movement.interface";
import {TypeMovementEntity} from "@entities/TypeMovement.entity";

@Entity()
export class MovementEntity extends BaseEntity implements Movement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  motif: string;

  @ManyToOne(() => TypeMovementEntity, (typeMovement: TypeMovementEntity) => typeMovement.movement)
  public typeMovement: TypeMovementEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.movement)
  public user: UserEntity;

  @ManyToOne(() => StatusEntity, (status: StatusEntity) => status.movement)
  public status: StatusEntity;
}
