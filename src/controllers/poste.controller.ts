import { NextFunction, Request, Response } from 'express';
import Helper from '@utils/helper';
import BaseController from '@controllers/BaseController.controller';
import { ApiResponse } from '@interfaces/response.interface';
import { Poste } from '@/interfaces/poste.interface';
import PosteService from '@/services/poste.service';
import { SECRET_KEY } from '@/config';
import { verify } from 'jsonwebtoken';
import { DataStoredInToken } from '@/interfaces/auth.interface';
import { UserEntity } from '@/entities/users.entity';

class PosteController extends BaseController {
  public posteService = new PosteService();
  public helper = new Helper();

  public getAllPoste = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit: number = +req.query.limit;
      const page: number = +req.query.page;
      const offset: number = await this.helper.calculOffset(limit, page);

      const Authorization = req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null;
      const secretKey: string = SECRET_KEY;
      const { id } = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const findUser = await UserEntity.findOne({ where: { id: id }, relations: ['pharmacy', 'contact', 'userStatus', 'status'] });

      const pharmacyId: number = findUser.pharmacy.id;

      const { poste, count } = await this.posteService.findAllPoste(limit, offset, pharmacyId);
      const totalRows: number = count;
      const postes: Poste[] = poste;

      const data: ApiResponse = await this.response(true, 'Get All Datas success', postes, totalRows, limit, page);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public getPosteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //   const contactId = Number(req.params.id);
      //   const findContact: Contact = await this.contactService.getContactById(contactId);
      //   const data: ApiResponse = await this.response(true, 'Get All Datas success', findContact, 1, null, null);
      //res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public updatePoste = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //   const contactId = Number(req.params.id);
      //   const contactData: CreateContactDto = req.body;
      //   const updateContactData: Contact = await this.contactService.updateContact(contactId, contactData);
      //   res.status(200).json({ data: updateContactData, message: 'contact updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePoste = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //   const contactId = Number(req.params.id);
      //   const deleteContactData: Object = await this.contactService.deleteContact(contactId);
      //   res.status(200).json({ data: deleteContactData, message: 'deleted success' });
    } catch (error) {
      next(error);
    }
  };
  public createPoste = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //   const contactId = Number(req.params.id);
      //   const deleteContactData: Object = await this.contactService.deleteContact(contactId);
      //   res.status(200).json({ data: deleteContactData, message: 'deleted success' });
    } catch (error) {
      next(error);
    }
  };
}
export default PosteController;
