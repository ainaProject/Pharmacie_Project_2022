import { Pharmacy } from './pharmacy.interface';

export interface Category {
  id: number;
  designation?: string;
  code?: string;
  pharmacy?: Pharmacy;
}
