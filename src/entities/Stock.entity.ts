import { IsEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Stock } from '@interfaces/stock.interface';
import { ProductEntity } from '@entities/Product.entity';

@Entity()
export class StockEntity extends BaseEntity implements Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.stock, {
    onDelete: 'CASCADE',
  })
  public product: ProductEntity;

  @Column()
  @IsEmpty()
  quantity: number;
}
