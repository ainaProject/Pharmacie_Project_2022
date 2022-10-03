import {Movement} from "@interfaces/movement.interface";

export interface MovementInvoice {
  id: number;
  movement: Movement;
  sumTotal: number;
  fileLocalCurl: string;
}
