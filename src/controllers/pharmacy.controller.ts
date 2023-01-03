import { NextFunction, Request, Response } from 'express';
import { CreateContactDto } from '@/dtos/contact.dto';
import { Contact } from 'swagger-jsdoc';
import ContactService from '@/services/contact.service';
import { Pharmacy } from '@/interfaces/pharmacy.interface';
import PharmacyService from '@/services/pharmacy.service';
import { CreatePharmacyDto, uptadePharmacyDto } from '@/dtos/pharmacy.dto';
import Helper from '@/utils/helper';
import { ApiResponse } from '@/interfaces/response.interface';
import BaseController from './BaseController.controller';

class PharmacyController extends BaseController {
  public pharmacyService = new PharmacyService();
  public contactService = new ContactService();
  public helper = new Helper();

  public getAllPharmacy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit: number = +req.query.limit;
      const page: number = +req.query.page;
      const keys: string = '' + req.query.key;
      const offset: number = await this.helper.calculOffset(limit, page);

      if (keys != '') {
        const findSearchPharmacy: Pharmacy[] = await this.pharmacyService.findAllPharmacy(null, null, null);
        const findSearchPharmacyData: Pharmacy[] = await this.pharmacyService.findAllPharmacy(limit, offset, keys);
        const data: ApiResponse = await this.response(true, 'Get All Datas success', findSearchPharmacyData, findSearchPharmacy.length, limit, page);
        res.status(200).json({ data });
      } else {
        const findAllPharmacy: Pharmacy[] = await this.pharmacyService.findAllPharmacy(null, null, null);
        const findAllPharmacyData: Pharmacy[] = await this.pharmacyService.findAllPharmacy(limit, offset, null);

        const data: ApiResponse = await this.response(true, 'Get All Datas success', findAllPharmacyData, findAllPharmacy.length, limit, page);
        res.status(200).json({ data });
      }
    } catch (error) {
      next(error);
    }
  };

  public getPharmacyById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pharmacyId = Number(req.params.id);
      const findOnePharmacyData: Pharmacy = await this.pharmacyService.findPharmacyById(pharmacyId);

      const data: ApiResponse = await this.response(true, 'Get All Datas success', findOnePharmacyData, 1, null, 1);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public createPharmacy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const contact: CreateContactDto = req.body.contact;
      const createContact: Contact = await this.contactService.createContact(contact);
      const findContact: Contact = await this.contactService.getContactById(createContact.id);

      const pharmacyData: CreatePharmacyDto = {
        designation: req.body.designation,
        typePharmacy: req.body.typePharmacy,
        contact: findContact,
        status: req.body.status,
      };

      const createPharmacyData: Pharmacy = await this.pharmacyService.createPharmacy(pharmacyData);

      res.status(201).json({ data: createPharmacyData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePharmacy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const contactId = Number(req.body.contact.id);
      const contactData: CreateContactDto = req.body.contact;
      await this.contactService.updateContact(contactId, contactData);

      const pharmacyId = Number(req.params.id);
      const pharmacyData: uptadePharmacyDto = req.body;
      const updatePharmacyData: Pharmacy = await this.pharmacyService.updatePharmacy(pharmacyId, pharmacyData);

      res.status(200).json({ data: updatePharmacyData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePharmacy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pharmacyId = Number(req.params.id);
      const deletePharmacyData: Pharmacy = await this.pharmacyService.deletePharmacy(pharmacyId);

      const contectId = Number(req.body.contact.id);
      await this.contactService.deleteContact(contectId);

      res.status(200).json({ data: deletePharmacyData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PharmacyController;
