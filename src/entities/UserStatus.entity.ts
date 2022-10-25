import { IsEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserEntity } from '@entities/users.entity';
import { UserStatus } from '@/interfaces/userStatus.interface';

@Entity()
export class UserStatusEntity extends BaseEntity implements UserStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmpty()
  designation: string;

  @Column()
  @IsEmpty()
  code: string;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.userStatus)
  public user: UserEntity[];
}
