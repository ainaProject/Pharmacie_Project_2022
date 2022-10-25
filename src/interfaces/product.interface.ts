import { Pharmacy } from '@interfaces/pharmacy.interface';
import { Category } from '@interfaces/category.interface';

export interface Product {
  id: number;
  designation: string;
  category: Category;
  unit_price: number;
  description?: string;
  pharmacy: Pharmacy;
}
