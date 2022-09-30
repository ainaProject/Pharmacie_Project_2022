import {Product} from "@interfaces/product.interface";

export interface Threshold {
  id: number;
  product: Product;
  min: number;
  max: number;
}
