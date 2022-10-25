import { Contact } from '@interfaces/contact.interface';
import { Role } from '@interfaces/role.interface';
import { Status } from '@interfaces/status.interface';
import { Pharmacy } from '@interfaces/pharmacy.interface';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  first_name: string;
  contact?: Contact;
  role?: Role;
  status?: Status;
  pharmacy?: Pharmacy;
}
