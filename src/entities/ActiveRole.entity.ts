import { IsEmpty, IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '@entities/users.entity';
import { ActiveRole } from '@interfaces/activeRole.interface';
import { TypeActiveRoleEntity } from '@entities/TypeActiveRole.entity';

@Entity()
export class ActiveRoleEntity extends BaseEntity implements ActiveRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TypeActiveRoleEntity, (typeActiveRole: TypeActiveRoleEntity) => typeActiveRole.activeRole)
  public typeActiveRole: TypeActiveRoleEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.activeRole)
  public user: UserEntity;

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}
