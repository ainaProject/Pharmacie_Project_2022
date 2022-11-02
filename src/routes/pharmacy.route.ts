import { Router } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import PharmacyController from '@/controllers/pharmacy.controller';
import adminAuthMiddleware from '@/middlewares/admin.middleware';
import { CreatePharmacyDto } from '@/dtos/pharmacy.dto';

class PharmacyRoute implements Routes {
  public path = '/pharmacy';
  public router = Router();
  public pharmacyController = new PharmacyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, adminAuthMiddleware, this.pharmacyController.getAllPharmacy);
    this.router.get(`${this.path}/:id(\\d+)`, adminAuthMiddleware, this.pharmacyController.getPharmacyById);
    this.router.post(`${this.path}`, adminAuthMiddleware, validationMiddleware(CreatePharmacyDto, 'body'), this.pharmacyController.createPharmacy);
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
