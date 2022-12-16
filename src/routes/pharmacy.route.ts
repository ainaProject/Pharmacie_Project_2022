import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import PharmacyController from '@/controllers/pharmacy.controller';
import adminAuthMiddleware from '@/middlewares/admin.middleware';
import { CreatePharmacyDto, uptadePharmacyDto } from '@/dtos/pharmacy.dto';
import authMiddleware from '@/middlewares/auth.middleware';

class PharmacyRoute implements Routes {
  public path = '/pharmacy';
  public router = Router();
  public pharmacyController = new PharmacyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.pharmacyController.getAllPharmacy);
    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.pharmacyController.getPharmacyById);
    this.router.post(`${this.path}`, validationMiddleware(CreatePharmacyDto, 'body'), this.pharmacyController.createPharmacy);
    this.router.put(
      `${this.path}/:id(\\d+)`,
      adminAuthMiddleware,
      validationMiddleware(CreatePharmacyDto, 'body', true),
      this.pharmacyController.updatePharmacy,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, adminAuthMiddleware, this.pharmacyController.deletePharmacy);
  }
}

export default PharmacyRoute;
