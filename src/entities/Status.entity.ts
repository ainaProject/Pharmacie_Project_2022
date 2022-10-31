/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { IsEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserEntity } from '@entities/users.entity';
import { Status } from '@interfaces/status.interface';
import { PharmacyEntity } from '@entities/Pharmacy.entity';
import { MovementEntity } from '@entities/Movement.entity';

@Entity()
export class StatusEntity extends BaseEntity implements Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmpty()
  designation: string;

  @Column()
  @IsEmpty()
  code: string;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.status)
  public user: UserEntity[];

  @OneToMany(() => PharmacyEntity, (pharmacy: PharmacyEntity) => pharmacy.status)
  public pharmacy: PharmacyEntity[];

  @OneToMany(() => MovementEntity, (movement: MovementEntity) => movement.status)
  public movement: MovementEntity[];
}
