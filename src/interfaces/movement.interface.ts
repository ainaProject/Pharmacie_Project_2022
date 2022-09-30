import {Pharmacy} from "@interfaces/pharmacy.interface";
import {User} from "@interfaces/users.interface";
import {TypeMovement} from "@interfaces/TypeMovement.interface";
import {Status} from "@interfaces/status.interface";

export interface Movement {
  id: number;
  motif: string;
  typeMovement: TypeMovement;
  user: User;
  status: Status;
}
