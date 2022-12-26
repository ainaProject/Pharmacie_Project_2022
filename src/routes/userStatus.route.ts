import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import UserStatusController from '@/controllers/userStatusController';
import { CreateUserStatusDto } from '@/dtos/userStatus.dto';

class UserStatusRoute implements Routes {
  public path = '/users-status';
  public router = Router();
  public userStatusController = new UserStatusController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.userStatusController.getAllUserStatus);
    this.router.get(`${this.path}/:id(\\d+)`, this.userStatusController.getUserStatusById);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserStatusDto, 'body'), this.userStatusController.createUserStatus);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateUserStatusDto, 'body', true), this.userStatusController.updateUserStatus);
    this.router.delete(`${this.path}/:id(\\d+)`, this.userStatusController.deleteUserStatus);
  }
}

export default UserStatusRoute;
