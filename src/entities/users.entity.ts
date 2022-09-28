import {IsEmpty, IsNotEmpty} from 'class-validator';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { User } from '@interfaces/users.interface';
import {Contact} from "swagger-jsdoc";
import {ContactEntity} from "@entities/Contact.entity";

@Entity()
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Unique(['name'])
  name: string;

  @Column()
  @IsNotEmpty()
  @Unique(['first_name'])
  first_name: string;

  @Column()
  @IsNotEmpty()
  @Unique(['email'])
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ContactEntity, (contact_id: ContactEntity) => contact_id.user)
  public contact: ContactEntity;
}
