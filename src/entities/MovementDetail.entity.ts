import { IsEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MovementDetail } from '@interfaces/movementDetail.interface';
import { ProductEntity } from '@entities/Product.entity';
import { MovementEntity } from '@entities/Movement.entity';

@Entity()
export class MovementDetailEntity extends BaseEntity implements MovementDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MovementEntity, (movement: MovementEntity) => movement.movementDetail, {
    onDelete: 'CASCADE',
  })
  public movement: MovementEntity;

  @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.movementDetail, {
    onDelete: 'CASCADE',
  })
  public product: ProductEntity;

  @Column()
  @IsEmpty()
  quantity: number;
}
