import {Contact} from "@interfaces/contact.interface";

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  first_name: string;
  contact?: Contact
}
