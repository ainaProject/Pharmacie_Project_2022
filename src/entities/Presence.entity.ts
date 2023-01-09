import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Presence } from '@interfaces/presence.interface';
import { UserEntity } from '@entities/users.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class PresenceEntity extends BaseEntity implements Presence {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.presence, {
    onDelete: 'CASCADE',
  })
  public user: UserEntity;

  @Column()
  @IsNotEmpty()
  startHourly: string;

  @Column()
  @IsNotEmpty()
  endHourly: string;

  @Column()
  @IsNotEmpty()
  activeDay: string;

  @Column()
  @IsNotEmpty()
  activeMonth: string;

  @Column()
  @IsNotEmpty()
  activeYear: string;
}
