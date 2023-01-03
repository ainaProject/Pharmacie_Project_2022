import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { CreateLoginDto } from '@/dtos/login.dto';
import UserService from '@/services/users.service';
import { ValueStatus } from '@/utils/util';

class AuthController {
  public authService = new AuthService();
  public userService = new UserService();
  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateLoginDto = req.body;
      const logInService: any = await this.authService.login(userData);

      if (logInService.success === false) {
        res.status(409).json({ message: logInService.message, success: false });
      } else {
        const user_id: number = logInService.user.id;
        const actifStatus = ValueStatus.active;
        await this.userService.updateStatusUser(user_id, await actifStatus);
        res.setHeader('Set-Cookie', logInService['cookie']);
        res.status(200).json({ data: logInService, message: 'login', success: true });
      }
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId: number = req.body.id;
      const inactifStatus = ValueStatus.inactif;

      await this.userService.updateStatusUser(userId, await inactifStatus);
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ message: 'logout success', success: true });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
