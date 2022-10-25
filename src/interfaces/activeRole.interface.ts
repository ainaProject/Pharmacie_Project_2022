import { TypeActiveRole } from '@interfaces/TypeActiveRole.interface';
import { User } from '@interfaces/users.interface';

export interface ActiveRole {
  id: number;
  typeActiveRole?: TypeActiveRole;
  user?: User;
}
