import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import { CreateContactDto } from '@/dtos/contact.dto';
import { Contact } from 'swagger-jsdoc';
import ContactService from '@/services/contact.service';
import { Pharmacy } from '@/interfaces/pharmacy.interface';
import PharmacyService from '@/services/pharmacy.service';
import { CreatePharmacyDto } from '@/dtos/pharmacy.dto';

class PharmacyController {
  public pharmacyService = new PharmacyService();
  public contactService = new ContactService();

  public getAllPharmacy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllPharmacyData: Pharmacy[] = await this.pharmacyService.findAllPharmacy();

      res.status(200).json({ data: findAllPharmacyData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPharmacyById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pharmacyId = Number(req.params.id);
      const findOnePharmacyData: Pharmacy = await this.pharmacyService.findPharmacyById(pharmacyId);

      res.status(200).json({ data: findOnePharmacyData, message: 'findOne' });
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
      console.log(pharmacyData);
      const createPharmacyData: Pharmacy = await this.pharmacyService.createPharmacy(pharmacyData);

      res.status(201).json({ data: createPharmacyData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePharmacy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pharmacyId = Number(req.params.id);
      const pharmacyData: CreatePharmacyDto = req.body;
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

      res.status(200).json({ data: deletePharmacyData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PharmacyController;
