import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { CreateLoginDto } from '@/dtos/login.dto';
import { token } from 'morgan';
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
      const user_id: number = logInService.user.id;
      const actifStatus = ValueStatus.active;
      await this.userService.updateStatusUser(user_id, await actifStatus);
      res.setHeader('Set-Cookie', logInService['cookie']);
      res.status(200).json({ data: logInService, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);
      const inactifStatus = ValueStatus.inactif;
      await this.userService.updateStatusUser(logOutUserData.id, await inactifStatus);
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
