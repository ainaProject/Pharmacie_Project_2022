import {Pharmacy} from "@interfaces/pharmacy.interface";

export interface Product {
  id: number;
  designation: string;
  unit_price: number;
  description?: string;
  pharmacy: Pharmacy;
}
