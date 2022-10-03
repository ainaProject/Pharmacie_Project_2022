import {Movement} from "@interfaces/movement.interface";
import {Product} from "@interfaces/product.interface";

export interface MovementDetail {
  movement: Movement;
  product: Product;
  quantity: number;
}
