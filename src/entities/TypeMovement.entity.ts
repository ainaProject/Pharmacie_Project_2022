import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TypeMovement } from '@interfaces/TypeMovement.interface';
import { MovementEntity } from '@entities/Movement.entity';

@Entity()
export class TypeMovementEntity extends BaseEntity implements TypeMovement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  designation: string;

  @Column()
  @IsNotEmpty()
  code: string;

  @OneToMany(() => MovementEntity, (movement: MovementEntity) => movement.typeMovement)
  public movement: MovementEntity[];
}
