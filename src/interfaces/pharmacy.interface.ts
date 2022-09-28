import {Status} from "@interfaces/status.interface";
import {Contact} from "@interfaces/contact.interface";
import {PharmacyType} from "@interfaces/pharmacyType.interface";

export interface Pharmacy {
  id: number;
  designation: string;
  pharmacyType: PharmacyType;
  contact?: Contact;
  status?: Status;
}
