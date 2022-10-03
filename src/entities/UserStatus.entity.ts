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
import { User } from '@interfaces/users.interface';
import {Contact} from "swagger-jsdoc";
import {ContactEntity} from "@entities/Contact.entity";
import {UserStatus} from "@interfaces/userStatus.interface";
import {UserEntity} from "@entities/users.entity";

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
