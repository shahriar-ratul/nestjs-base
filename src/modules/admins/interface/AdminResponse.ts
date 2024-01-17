import { Permission } from "../entities/Permission.entity";
import { Role } from "../entities/Role.entity";


export interface AdminResponse {
  id: number;
  username: string;
  email: string;
  phone: string;
  permissions?: Permission[] | null;
  roles?: Role[] | null;
}
