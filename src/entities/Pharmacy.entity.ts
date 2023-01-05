import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ContactEntity } from '@entities/Contact.entity';
import { StatusEntity } from '@entities/Status.entity';
import { TypePharmacyEntity } from '@entities/TypePharmacy.entity';
import { Pharmacy } from '@interfaces/pharmacy.interface';
import { UserEntity } from '@entities/users.entity';
import { ProductEntity } from '@entities/Product.entity';
import { PosteEntity } from './Poste.entity';
import { CategoryEntity } from './Category.entity';

@Entity()
export class PharmacyEntity extends BaseEntity implements Pharmacy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  designation: string;

  @ManyToOne(() => ContactEntity, (contact: ContactEntity) => contact.pharmacy)
  public contact: ContactEntity;

  @ManyToOne(() => TypePharmacyEntity, (typePharmacy: TypePharmacyEntity) => typePharmacy.pharmacy)
  public typePharmacy: TypePharmacyEntity;

  @ManyToOne(() => StatusEntity, (status: StatusEntity) => status.pharmacy)
  public status: StatusEntity;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.pharmacy)
  public user: UserEntity[];

  @OneToMany(() => ProductEntity, (product: ProductEntity) => product.pharmacy)
  public product: ProductEntity[];

  @OneToMany(() => PosteEntity, (poste: PosteEntity) => poste.pharmacy)
  public poste: PosteEntity[];

  @OneToMany(() => CategoryEntity, (category: CategoryEntity) => category.pharmacy)
  public category: CategoryEntity[];
}
