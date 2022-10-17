import ContactService from "@services/contact.service";
import {NextFunction, Request, Response} from "express";
import {User} from "@interfaces/users.interface";
import {Contact} from "@interfaces/contact.interface";
import Helper from "@utils/helper";
import BaseController from "@controllers/BaseController.controller";
import {ApiResponse} from "@interfaces/response.interface";

class ContactController extends BaseController {
  public contactService = new ContactService();
  public helper = new Helper();

  public getAllContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit: number = +req.query.limit;
      const page: number =  +req.query.page;
      const offset: number = await this.helper.calculOffset(limit, page);

      const findAllContacts: Contact[] = await this.contactService.findAllContact(null, null);
      const findAllContactsData: Contact[] = await this.contactService.findAllContact(limit, offset);

      const data: ApiResponse =  await this.response(
        true,
        "Get All Datas success",
        findAllContactsData,
        findAllContacts.length,
        limit,
        page
      );

      res.status(200).json({data});
    } catch (error) {
      next(error);
    }
  };
}
