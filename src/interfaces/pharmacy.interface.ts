import {Status} from "@interfaces/status.interface";
import {Contact} from "@interfaces/contact.interface";
import {TypePharmacy} from "@interfaces/TypePharmacy.interface";

export interface Pharmacy {
  id: number;
  designation: string;
  typePharmacy: TypePharmacy;
  contact?: Contact;
  status?: Status;
}
