import { BaseOrmEntity } from "@/common/helpers/BaseOrmEntity";
import { Permission } from "../entities/Permission.entity";
import { Role } from "../entities/Role.entity";


export interface AdminResponse {
  id: number;
  username: string;
  email: string;
  phone: string;
  base: BaseOrmEntity;
  permissions?: Permission[] | null;
  roles?: Role[] | null;
}
