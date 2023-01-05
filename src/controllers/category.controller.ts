import { NextFunction, Request, Response } from 'express';
import Helper from '@utils/helper';
import BaseController from '@controllers/BaseController.controller';
import { ApiResponse } from '@interfaces/response.interface';
import { Category } from '@/interfaces/category.interface';
import CategoryService from '@/services/category.service';
import { CreateCategoryDto } from '@/dtos/category.dto';
import { User } from '@/interfaces/users.interface';

class CategoryController extends BaseController {
  public categoryService = new CategoryService();
  public helper = new Helper();

  public createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const objectCategory: CreateCategoryDto = req.body;
      const createCategory: Category = await this.categoryService.createCategory(objectCategory);

      res.status(201).json({ data: createCategory, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
  public getAllCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit: number = +req.query.limit;
      const page: number = +req.query.page;
      const offset: number = await this.helper.calculOffset(limit, page);
      const userConnect: User = await this.helper.getUser(req);
      const pharmacy_id: number = userConnect.pharmacy.id;

      const { category, count } = await this.categoryService.findAllCategory(limit, offset, pharmacy_id);
      const totalRows: number = count;
      const categorys: Category[] = category;

      const data: ApiResponse = await this.response(true, 'Get All Datas success', categorys, totalRows, limit, page);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public getCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryId = Number(req.params.id);
      const findCategory: Category = await this.categoryService.getCategoryById(categoryId);

      const data: ApiResponse = await this.response(true, 'Get All Datas success', findCategory, 1, null, null);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryId = Number(req.params.id);
      const categoryData: CreateCategoryDto = req.body;
      const updateCategoryData: Category = await this.categoryService.updateCategory(categoryId, categoryData);

      res.status(200).json({ data: updateCategoryData, message: 'category updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const contactId = Number(req.params.id);
      const deleteContactData: Object = await this.categoryService.deleteCategory(contactId);

      res.status(200).json({ data: deleteContactData, message: 'deleted success' });
    } catch (error) {
      next(error);
    }
  };
}
export default CategoryController;
