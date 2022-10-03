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
import {MovementDetail} from "@interfaces/movementDetail.interface";
import {ProductEntity} from "@entities/Product.entity";
import {MovementEntity} from "@entities/Movement.entity";

@Entity()
export class MovementDetailEntity extends BaseEntity implements MovementDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MovementEntity, (movement: MovementEntity) => movement.movementDetail)
  public movement: MovementEntity;

  @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.movementDetail)
  public product: ProductEntity;

  @Column()
  @IsEmpty()
  quantity: number;
}
