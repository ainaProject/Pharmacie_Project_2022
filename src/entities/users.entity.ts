/* eslint-disable prettier/prettier */
import {IsNotEmpty} from 'class-validator';
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
import {ContactEntity} from "@entities/Contact.entity";
import {UserStatusEntity} from "@entities/UserStatus.entity";
import {StatusEntity} from "@entities/Status.entity";
import {Status} from "@interfaces/status.interface";
import {PharmacyEntity} from "@entities/Pharmacy.entity";
import {MovementEntity} from "@entities/Movement.entity";
import {PresenceEntity} from "@entities/Presence.entity";
import { PosteEntity } from './Poste.entity';

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
//-----------------------Many To One Relations------------------------------------
  @ManyToOne(() => ContactEntity, (contact: ContactEntity) => contact.user)
  public contact: ContactEntity;

  @ManyToOne(() => UserStatusEntity, (userStatus: UserStatusEntity) => userStatus.user)
  public userStatus: UserStatusEntity;

  @ManyToOne(() => StatusEntity, (status: StatusEntity) => status.user)
  public status: Status;

  @ManyToOne(() => PharmacyEntity, (pharmacy: PharmacyEntity) => pharmacy.user)
  public pharmacy: PharmacyEntity;

  @ManyToOne(() => PosteEntity, (poste: PosteEntity) => poste.user)
  public poste: PosteEntity;
//---------------------One To Many Relations------------------------------------------------
  @OneToMany(() => MovementEntity, (movement: MovementEntity) => movement.send)
  public movement: MovementEntity[];

  @OneToMany(() => MovementEntity, (movement: MovementEntity) => movement.receiver)
  public movement_2: MovementEntity[];

  @OneToMany(() => MovementEntity, (movement: MovementEntity) => movement.validate)
  public movement_3: MovementEntity[];

  @OneToMany(() => PresenceEntity, (presence: PresenceEntity) => presence.user)
  public presence: PresenceEntity[];
}
