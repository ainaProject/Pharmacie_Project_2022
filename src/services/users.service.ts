import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto, updateUserDto } from '@dtos/users.dto';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { StatusEntity } from '@/entities/Status.entity';

@EntityRepository()
class UserService extends Repository<UserEntity> {
  public async findAllUser(limit: number, offset: number): Promise<{ user: User[]; count: number }> {
    const [user, count]: [User[], number] = await UserEntity.createQueryBuilder('qb')
      .leftJoinAndSelect('qb.pharmacy', 'ph')
      .leftJoinAndSelect('qb.contact', 'ct')
      .leftJoinAndSelect('qb.userStatus', 'ust')
      .leftJoinAndSelect('qb.status', 'st')
      .leftJoinAndSelect('qb.poste', 'ps')
      .limit(limit ? limit : 0)
      .offset(offset ? offset : 0)
      .orderBy('qb.id', 'ASC')
      .getManyAndCount();

    return { user, count };
  }
  public async findAllUserWithCondition(limit: number, offset: number, idPharmacy: number): Promise<{ user: User[]; count: number }> {
    const [user, count]: [User[], number] = await UserEntity.createQueryBuilder('qb')
      .leftJoinAndSelect('qb.pharmacy', 'ph')
      .leftJoinAndSelect('qb.contact', 'ct')
      .leftJoinAndSelect('qb.userStatus', 'ust')
      .leftJoinAndSelect('qb.status', 'st')
      .leftJoinAndSelect('qb.poste', 'ps')
      .where('ph.id = :id', { id: idPharmacy })
      .limit(limit ? limit : 0)
      .offset(offset ? offset : 0)
      .orderBy('qb.id', 'ASC')
      .getManyAndCount();

    return { user, count };
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await UserEntity.findOne({ where: { id: userId }, relations: ['pharmacy', 'contact', 'userStatus', 'status', 'poste'] });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await UserEntity.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserEntity.create({ ...userData, password: hashedPassword }).save();

    return createUserData;
  }

  public async updateUser(userId: number, userData: updateUserDto): Promise<User> {
    const findUser: User = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");
    await UserEntity.update(userId, { ...userData });

    const updateUser: User = await UserEntity.findOne({ where: { id: userId }, relations: ['pharmacy', 'contact', 'userStatus', 'status', 'poste'] });
    return updateUser;
  }

  public async updateStatusUser(userId: number, cd: string): Promise<User> {
    const findUser: User = await UserEntity.findOne({ where: { id: userId }, relations: ['pharmacy', 'contact', 'userStatus', 'status', 'poste'] });
    if (!findUser) throw new HttpException(409, "User doesn't exist");
    const status: any = await StatusEntity.findAndCount({
      where: { code: cd },
      take: 1,
    });

    const objectUser: CreateUserDto = {
      name: findUser.name,
      first_name: findUser.first_name,
      email: findUser.email,
      password: findUser.password,
      contact: findUser.contact,
      userStatus: findUser.userStatus,
      status: status[0][0],
      pharmacy: findUser.pharmacy,
    };

    await UserEntity.update(userId, { ...objectUser });
    const updateUser: User = await UserEntity.findOne({ where: { id: userId } });
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await UserEntity.delete({ id: userId });
    return findUser;
  }
}

export default UserService;
