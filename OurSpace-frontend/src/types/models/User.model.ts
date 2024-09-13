import { Role } from './Role.model';

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  id_userprofile: string;
  roles: Role[];
};
