import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';
import { CreateContactDto } from '@/dtos/contact.dto';
import { Contact } from 'swagger-jsdoc';
import ContactService from '@/services/contact.service';
import BaseController from './BaseController.controller';
import Helper from '@/utils/helper';
import { ApiResponse } from '@/interfaces/response.interface';

class UsersController extends BaseController {
  public userService = new userService();
  public contactService = new ContactService();
  public helper = new Helper();

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit: number = +req.query.limit;
      const page: number = +req.query.page;
      const offset: number = await this.helper.calculOffset(limit, page);

      const findAllUsers: User[] = await this.userService.findAllUser(null, null);
      const findAllUsersData: User[] = await this.userService.findAllUser(limit, offset);

      const data: ApiResponse = await this.response(true, 'Get All Datas success', findAllUsersData, findAllUsers.length, limit, page);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: User = await this.userService.findUserById(userId);

      const data: ApiResponse = await this.response(true, 'Get One Datas success', findOneUserData, 1, null, 1);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const contact: CreateContactDto = req.body.contact;
      const createContact: Contact = await this.contactService.createContact(contact);
      const findContact: Contact = await this.contactService.getContactById(createContact.id);

      const userData: CreateUserDto = {
        name: req.body.name,
        first_name: req.body.first_name,
        email: req.body.email,
        password: req.body.password,
        contact: findContact,
        userStatus: req.body.userStatus,
        status: req.body.status,
        pharmacy: req.body.pharmacy,
      };

      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
