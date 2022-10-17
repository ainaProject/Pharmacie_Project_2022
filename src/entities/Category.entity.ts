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
import {Category} from "@interfaces/category.interface";
import {StockEntity} from "@entities/Stock.entity";
import {ProductEntity} from "@entities/Product.entity";

@Entity()
export class CategoryEntity extends BaseEntity implements Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmpty()
  designation: string;

  @Column()
  @IsEmpty()
  code: string;

  @OneToMany(() => ProductEntity, (product: ProductEntity) => product.category)
  public product: ProductEntity[];
}
