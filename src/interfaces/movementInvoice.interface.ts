import {Movement} from "@interfaces/movement.interface";

export interface MovementInvoice {
  movement: Movement;
  sumTotal: number;
  fileLocalCurl: string;
}
