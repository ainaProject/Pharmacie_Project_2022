import { IsEmpty, IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '@entities/users.entity';
import { MovementInvoice } from '@interfaces/movementInvoice.interface';
import { MovementEntity } from '@entities/Movement.entity';

@Entity()
export class MovementInvoiceEntity extends BaseEntity implements MovementInvoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => MovementEntity, (movement: MovementEntity) => movement.movementInvoice)
  public movement: MovementEntity;

  @Column()
  @IsNotEmpty()
  sumTotal: number;
}
