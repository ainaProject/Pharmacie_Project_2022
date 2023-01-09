import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { StatusEntity } from '@entities/Status.entity';
import { UserEntity } from '@entities/users.entity';
import { Movement } from '@interfaces/movement.interface';
import { TypeMovementEntity } from '@entities/TypeMovement.entity';
import { MovementDetailEntity } from '@entities/MovementDetail.entity';
import { MovementInvoiceEntity } from '@entities/MovementInvoice.entity';

@Entity()
export class MovementEntity extends BaseEntity implements Movement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  motif: string;

  @ManyToOne(() => TypeMovementEntity, (typeMovement: TypeMovementEntity) => typeMovement.movement, {
    onDelete: 'CASCADE',
  })
  public typeMovement: TypeMovementEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.movement, {
    onDelete: 'CASCADE',
  })
  public send: UserEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.movement_2, {
    onDelete: 'CASCADE',
  })
  public receiver: UserEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.movement_3, {
    onDelete: 'CASCADE',
  })
  public validate: UserEntity;

  @ManyToOne(() => StatusEntity, (status: StatusEntity) => status.movement, {
    onDelete: 'CASCADE',
  })
  public status: StatusEntity;

  @OneToMany(() => MovementDetailEntity, (movementDetail: MovementDetailEntity) => movementDetail.movement)
  public movementDetail: MovementDetailEntity[];

  @OneToMany(() => MovementInvoiceEntity, (movementInvoice: MovementInvoiceEntity) => movementInvoice.movement)
  public movementInvoice: MovementInvoiceEntity[];
}
