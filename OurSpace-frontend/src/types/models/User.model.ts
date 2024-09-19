import { Role } from './Role.model';


export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userProfile: {
    id: string | undefined;
  }
  roles: Role[];
};
