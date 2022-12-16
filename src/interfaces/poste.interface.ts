import { Pharmacy } from './pharmacy.interface';

export interface Poste {
  id: number;
  designation: string;
  pharmacy?: Pharmacy;
}
