import { User } from '@interfaces/users.interface';
import { TypeMovement } from '@interfaces/TypeMovement.interface';
import { Status } from '@interfaces/status.interface';

export interface Movement {
  id: number;
  motif: string;
  typeMovement: TypeMovement;
  send: User;
  receiver: User;
  validate?: User;
  status: Status;
}
