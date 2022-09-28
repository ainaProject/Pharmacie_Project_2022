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
import { Contact } from '@interfaces/contact.interface';
import {UserEntity} from "@entities/users.entity";

@Entity()
export class ContactEntity extends BaseEntity implements Contact {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmpty()
  @Unique(['email'])
  email: string;

  @Column()
  @IsEmpty()
  @Unique(['telephone'])
  telephone: string;

  @Column()
  @IsEmpty()
  location: string;

  @Column()
  @IsEmpty()
  altitude: string;

  @Column()
  @IsEmpty()
  longitude: string;

  @Column()
  @IsEmpty()
  country: string;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.contact)
  public user: UserEntity[];
}
