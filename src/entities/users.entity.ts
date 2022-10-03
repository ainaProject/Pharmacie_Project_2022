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
import {UserStatusEntity} from "@entities/UserStatus.entity";
import {StatusEntity} from "@entities/Status.entity";
import {Status} from "@interfaces/status.interface";
import {PharmacyEntity} from "@entities/Pharmacy.entity";
import {MovementEntity} from "@entities/Movement.entity";
import {ActiveRoleEntity} from "@entities/ActiveRole.entity";

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

  @ManyToOne(() => UserStatusEntity, (userStatus: UserStatusEntity) => userStatus.user)
  public userStatus: UserStatusEntity;

  @ManyToOne(() => StatusEntity, (status: StatusEntity) => status.user)
  public status: Status;

  @ManyToOne(() => PharmacyEntity, (pharmacy: PharmacyEntity) => pharmacy.user)
  public pharmacy: PharmacyEntity;

  @OneToMany(() => MovementEntity, (movement: MovementEntity) => movement.user)
  public movement: MovementEntity[];

  @OneToMany(() => ActiveRoleEntity, (activeRole: ActiveRoleEntity) => activeRole.user)
  public activeRole: ActiveRoleEntity[];
}
