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
import {RoleEntity} from "@entities/Role.entity";
import {Role} from "@interfaces/role.interface";
import {StatusEntity} from "@entities/Status.entity";
import {Status} from "@interfaces/status.interface";
import {PharmacyEntity} from "@entities/Pharmacy.entity";
import {MovementEntity} from "@entities/Movement.entity";

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

  @ManyToOne(() => ContactEntity, (contact: ContactEntity) => contact.user)
  public contact: ContactEntity;

  @ManyToOne(() => RoleEntity, (role: RoleEntity) => role.user)
  public role: RoleEntity;

  @ManyToOne(() => StatusEntity, (status: StatusEntity) => status.user)
  public status: Status;

  @ManyToOne(() => PharmacyEntity, (pharmacy: PharmacyEntity) => pharmacy.user)
  public pharmacy: PharmacyEntity;

  @OneToMany(() => MovementEntity, (movement: MovementEntity) => movement.user)
  public movement: MovementEntity[];
}
