import { IsEmpty, IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '@entities/users.entity';
import { TypeActiveRole } from '@interfaces/TypeActiveRole.interface';
import { ActiveRoleEntity } from '@entities/ActiveRole.entity';

@Entity()
export class TypeActiveRoleEntity extends BaseEntity implements TypeActiveRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmpty()
  designation: string;

  @Column()
  @IsEmpty()
  code: string;

  @OneToMany(() => ActiveRoleEntity, (activeRole: ActiveRoleEntity) => activeRole.typeActiveRole)
  public activeRole: ActiveRoleEntity[];
}
