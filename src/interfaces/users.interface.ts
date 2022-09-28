import {Contact} from "@interfaces/contact.interface";
import {Role} from "@interfaces/role.interface";

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  first_name: string;
  contact?: Contact;
  role?: Role;
}
