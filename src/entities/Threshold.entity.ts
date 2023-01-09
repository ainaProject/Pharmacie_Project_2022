import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Threshold } from '@interfaces/Threshold.interface';
import { ProductEntity } from '@entities/Product.entity';

@Entity()
export class ThresholdEntity extends BaseEntity implements Threshold {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.threshold, {
    onDelete: 'CASCADE',
  })
  public product: ProductEntity;

  @Column()
  @IsNotEmpty()
  min: number;

  @Column()
  @IsNotEmpty()
  max: number;
}
