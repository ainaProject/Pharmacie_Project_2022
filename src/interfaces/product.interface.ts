import {Pharmacy} from "@interfaces/pharmacy.interface";

export interface Product {
  id: number;
  designation: string;
  description?: string;
  pharmacy: Pharmacy;
}
