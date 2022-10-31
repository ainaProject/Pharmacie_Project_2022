import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { UserStatusEntity } from '@/entities/UserStatus.entity';
import { UserStatus } from '@/interfaces/userStatus.interface';
import { CreateUserStatusDto } from '@/dtos/userStatus.dto';

@EntityRepository()
class UserStatusService extends Repository<UserStatusEntity> {
  public async findAllUserStatus(limit: number, offset: number): Promise<UserStatus[]> {
    const userStatus: UserStatus[] = await UserStatusEntity.find({
      where: {},
      order: { id: 'ASC' },
      take: limit,
      skip: offset,
    });

    return userStatus;
  }

  public async getUserStatusById(userStatusId: number): Promise<UserStatus> {
    const userStatus: UserStatus = await UserStatusEntity.findOne({
      where: { id: userStatusId },
    });

    return userStatus;
  }

  public async updateUserStatus(userStatusId: number, userStatusData: CreateUserStatusDto): Promise<UserStatus> {
    if (isEmpty(userStatusData)) throw new HttpException(400, 'user_statusId not found');

    const findUserStatus: UserStatus = await UserStatusEntity.findOne({ where: { id: userStatusId } });
    if (!findUserStatus) throw new HttpException(409, 'user_status not found');

    await UserStatusEntity.update(userStatusId, { ...userStatusData });

    const updateUserStatus: UserStatus = await UserStatusEntity.findOne({ where: { id: userStatusId } });
    return updateUserStatus;
  }

  public async deleteUserStatus(userStatusId: number): Promise<Object> {
    if (isEmpty(userStatusId)) throw new HttpException(400, 'user_statusId not found');

    const findUserStatus: UserStatus = await UserStatusEntity.findOne({ where: { id: userStatusId } });

    if (!findUserStatus) throw new HttpException(409, 'user_statusId not found');

    await UserStatusEntity.delete({ id: userStatusId });
    return { success: true };
  }

  public async createUserStatus(userStatusData: CreateUserStatusDto): Promise<UserStatus> {
    if (isEmpty(userStatusData)) throw new HttpException(400, 'userData is empty');

    const createUserStatus: UserStatus = await UserStatusEntity.create({ ...userStatusData }).save();

    return createUserStatus;
  }
}
export default UserStatusService;
