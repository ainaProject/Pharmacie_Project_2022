import { User } from '@interfaces/users.interface';

export interface Presence {
  id: number;
  user: User;
  startHourly: string;
  endHourly: string;
  activeDay: string;
  activeMonth: string;
  activeYear: string;
}
