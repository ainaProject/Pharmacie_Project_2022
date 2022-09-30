import {Product} from "@interfaces/product.interface";

export interface Stock {
  id: number;
  product: Product;
  quantity?: number;
}
