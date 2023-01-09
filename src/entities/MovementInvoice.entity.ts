import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { MovementInvoice } from '@interfaces/movementInvoice.interface';
import { MovementEntity } from '@entities/Movement.entity';

@Entity()
export class MovementInvoiceEntity extends BaseEntity implements MovementInvoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => MovementEntity, (movement: MovementEntity) => movement.movementInvoice, {
    onDelete: 'CASCADE',
  })
  public movement: MovementEntity;

  @Column()
  @IsNotEmpty()
  sumTotal: number;
}
