import { SECRET_KEY } from '@/config';
import { UserEntity } from '@/entities/users.entity';
import { HttpException } from '@/exceptions/HttpException';
import { DataStoredInToken } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';

class Helper {
  public calculOffset = async (limit: number, page: number): Promise<number> => {
    const offset: number = limit * (page - 1);
    return offset;
  };

  public getUser = async (req: Request): Promise<User> => {
    try {
      const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
      const secretKey: string = SECRET_KEY;
      const { id } = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const findUser: User = await UserEntity.findOne({ where: { id: id }, relations: ['pharmacy', 'contact', 'userStatus', 'status'] });

      return findUser;
    } catch (error) {
      throw new HttpException(401, 'Wrong authentication token');
    }
  };
}
export default Helper;
