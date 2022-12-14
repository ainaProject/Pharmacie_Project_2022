import { NextFunction, Request, Response } from 'express';
import Helper from '@utils/helper';
import BaseController from '@controllers/BaseController.controller';
import { ApiResponse } from '@interfaces/response.interface';
import { TypePharmacy } from '@/interfaces/TypePharmacy.interface';
import TypePharmacyService from '@/services/typePharmacy.service';

class TypePharmacyController extends BaseController {
  public helper = new Helper();
  public typePharmacyService = new TypePharmacyService();

  public getAllTypePharmacy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllType: TypePharmacy[] = await this.typePharmacyService.findAllTypePharmacy();

      const data: ApiResponse = await this.response(true, 'Get All Datas success', findAllType, findAllType.length, null, null);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public getTypePharmacyById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typePharmacyId = Number(req.params.id);
      const findTypePharmacy: TypePharmacy = await this.typePharmacyService.getTypePharmacyById(typePharmacyId);
      const data: ApiResponse = await this.response(true, 'Get All Datas success', findTypePharmacy, 1, null, null);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}

export default TypePharmacyController;
