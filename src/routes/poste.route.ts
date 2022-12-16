import PosteController from '@/controllers/poste.controller';
import { CreatePosteDto } from '@/dtos/poste.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class PosteRoute implements Routes {
  public path = '/postes';
  public router = Router();
  public posteController = new PosteController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.posteController.getAllPoste);
    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.posteController.getPosteById);
    this.router.post(`${this.path}`, validationMiddleware(CreatePosteDto, 'body'), this.posteController.createPoste);
    this.router.put(`${this.path}/:id(\\d+)`, authMiddleware, this.posteController.updatePoste);
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.posteController.deletePoste);
  }
}

export default PosteRoute;
