import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from 'typeorm';
import { PharmacyEntity } from '@entities/Pharmacy.entity';
import { Poste } from '@/interfaces/poste.interface';
import { UserEntity } from './users.entity';
import { IsEmpty, IsNotEmpty } from 'class-validator';

@Entity()
export class PosteEntity extends BaseEntity implements Poste {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  designation: string;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.poste)
  public user: UserEntity[];

  @ManyToOne(() => PharmacyEntity, (pharmacy: PharmacyEntity) => pharmacy.poste)
  public pharmacy: PharmacyEntity;

  @Column()
  @IsEmpty()
  indexs: string;
}
