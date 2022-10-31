import { NextFunction, Request, Response } from 'express';
import { Contact } from '@interfaces/contact.interface';
import Helper from '@utils/helper';
import BaseController from '@controllers/BaseController.controller';
import { ApiResponse } from '@interfaces/response.interface';
import { UserStatus } from '@/interfaces/userStatus.interface';
import { CreateUserStatusDto } from '@/dtos/userStatus.dto';
import UserStatusService from '@/services/userStatus.service';

class UserStatusController extends BaseController {
  public userStatusService = new UserStatusService();
  public helper = new Helper();

  public getAllUserStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit: number = +req.query.limit;
      const page: number = +req.query.page;
      const offset: number = await this.helper.calculOffset(limit, page);

      const findAllUserStatus: UserStatus[] = await this.userStatusService.findAllUserStatus(null, null);
      const findAllUserStatusData: UserStatus[] = await this.userStatusService.findAllUserStatus(limit, offset);

      const data: ApiResponse = await this.response(true, 'Get All Datas success', findAllUserStatusData, findAllUserStatus.length, limit, page);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public getUserStatusById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userStatusId = Number(req.params.id);
      const findUserStatus: UserStatus = await this.userStatusService.getUserStatusById(userStatusId);

      const data: ApiResponse = await this.response(true, 'Get All Datas success', findUserStatus, 1, null, null);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public updateUserStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userStatusId = Number(req.params.id);
      const userStatusData: CreateUserStatusDto = req.body;
      const updateUserStatusData: Contact = await this.userStatusService.updateUserStatus(userStatusId, userStatusData);

      res.status(200).json({ data: updateUserStatusData, message: 'user Status updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUserStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userStatusId = Number(req.params.id);
      const deleteUserStatusData: Object = await this.userStatusService.deleteUserStatus(userStatusId);

      res.status(200).json({ data: deleteUserStatusData, message: 'deleted success' });
    } catch (error) {
      next(error);
    }
  };

  public createUserStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userStatus: CreateUserStatusDto = req.body;
      const createUserStatus: UserStatus = await this.userStatusService.createUserStatus(userStatus);

      res.status(201).json({ data: createUserStatus, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
export default UserStatusController;
