import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import TypePharmacyController from '@/controllers/typePharmacy.controller';
import adminAndPHAuthMiddleware from '@/middlewares/adminPHO.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class TypePharmacyRoute implements Routes {
  public path = '/type-pharmacy';
  public router = Router();
  public typePharmacyController = new TypePharmacyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.typePharmacyController.getAllTypePharmacy);
    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.typePharmacyController.getTypePharmacyById);
  }
}

export default TypePharmacyRoute;
