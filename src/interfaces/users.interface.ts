import { Contact } from '@interfaces/contact.interface';
import { Status } from '@interfaces/status.interface';
import { Pharmacy } from '@interfaces/pharmacy.interface';
import { UserStatus } from './userStatus.interface';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  first_name: string;
  contact?: Contact;
  status?: Status;
  pharmacy?: Pharmacy;
  userStatus?: UserStatus;
}
