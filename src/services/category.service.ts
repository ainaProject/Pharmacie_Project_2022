import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@/exceptions/HttpException';
import { Category } from '@/interfaces/category.interface';
import { CreateCategoryDto } from '@/dtos/category.dto';
import { CategoryEntity } from '@/entities/Category.entity';

@EntityRepository()
class CategoryService extends Repository<CategoryEntity> {
  public async findAllCategory(limit: number, offset: number, pharmacy_id: number): Promise<{ category: Category[]; count: number }> {
    const [category, count]: [Category[], number] = await CategoryEntity.createQueryBuilder('qb')
      .leftJoinAndSelect('qb.pharmacy', 'ph')
      .where('ph.id = :id', { id: pharmacy_id })
      .limit(limit ? limit : 0)
      .offset(offset ? offset : 0)
      .orderBy('qb.id', 'ASC')
      .getManyAndCount();

    return { category, count };
  }

  public async getCategoryById(categoryId: number): Promise<Category> {
    const category: Category = await CategoryEntity.findOne({
      where: { id: categoryId },
    });

    return category;
  }

  public async updateCategory(categoryId: number, categoryData: CreateCategoryDto): Promise<Category> {
    const findCategory: Category = await CategoryEntity.findOne({ where: { id: categoryId }, relations: ['pharmacy'] });
    if (!findCategory) throw new HttpException(409, 'contact not found');

    await CategoryEntity.update(categoryId, { ...categoryData });

    const updateCategory: Category = await CategoryEntity.findOne({ where: { id: categoryId }, relations: ['pharmacy'] });
    return updateCategory;
  }

  public async deleteCategory(categoryId: number): Promise<Object> {
    const findCategory: Category = await CategoryEntity.findOne({ where: { id: categoryId } });

    if (!findCategory) throw new HttpException(409, 'categoryId not found');

    await CategoryEntity.delete({ id: categoryId });
    return { success: true };
  }

  public async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    const createCategory: Category = await CategoryEntity.create({ ...categoryData }).save();

    return createCategory;
  }
}

export default CategoryService;
