import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import adminAuthMiddleware from '@/middlewares/admin.middleware';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, adminAuthMiddleware, this.usersController.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, adminAuthMiddleware, this.usersController.getUserById);
    this.router.post(`${this.path}`, adminAuthMiddleware, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.put(
      `${this.path}/:id(\\d+)`,
      adminAuthMiddleware,
      validationMiddleware(CreateUserDto, 'body', true),
      this.usersController.updateUser,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, adminAuthMiddleware, this.usersController.deleteUser);
  }
}

export default UsersRoute;
