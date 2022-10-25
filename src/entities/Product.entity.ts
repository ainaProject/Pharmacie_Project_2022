import { IsEmpty, IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '@interfaces/users.interface';
import { Contact } from 'swagger-jsdoc';
import { ContactEntity } from '@entities/Contact.entity';
import { StatusEntity } from '@entities/Status.entity';
import { TypePharmacyEntity } from '@entities/TypePharmacy.entity';
import { Pharmacy } from '@interfaces/pharmacy.interface';
import { UserEntity } from '@entities/users.entity';
import { Product } from '@interfaces/product.interface';
import { PharmacyEntity } from '@entities/Pharmacy.entity';
import { StockEntity } from '@entities/Stock.entity';
import { ThresholdEntity } from '@entities/Threshold.entity';
import { MovementDetailEntity } from '@entities/MovementDetail.entity';
import { CategoryEntity } from '@entities/Category.entity';

@Entity()
export class ProductEntity extends BaseEntity implements Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  designation: string;

  @ManyToOne(() => CategoryEntity, (category: CategoryEntity) => category.product)
  public category: CategoryEntity;

  @Column()
  @IsNotEmpty()
  unit_price: number;

  @Column()
  @IsEmpty()
  description: string;

  @ManyToOne(() => PharmacyEntity, (pharmacy: PharmacyEntity) => pharmacy.product)
  public pharmacy: PharmacyEntity;

  @OneToMany(() => StockEntity, (stock: StockEntity) => stock.product)
  public stock: StockEntity[];

  @OneToMany(() => ThresholdEntity, (threshold: ThresholdEntity) => threshold.product)
  public threshold: ThresholdEntity[];

  @OneToMany(() => MovementDetailEntity, (movementDetail: MovementDetailEntity) => movementDetail.product)
  public movementDetail: MovementDetailEntity[];
}
