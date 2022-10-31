import { IsEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Contact } from '@interfaces/contact.interface';
import { UserEntity } from '@entities/users.entity';
import { PharmacyEntity } from '@entities/Pharmacy.entity';

@Entity()
export class ContactEntity extends BaseEntity implements Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmpty()
  email: string;

  @Column()
  @IsEmpty()
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

  @OneToMany(() => PharmacyEntity, (pharmacy: PharmacyEntity) => pharmacy.contact)
  public pharmacy: UserEntity[];
}
