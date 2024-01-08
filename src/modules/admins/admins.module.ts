import { Module, forwardRef } from "@nestjs/common";
import { AdminsService } from "./admin/admins.service";
import { AdminsController } from "./admin/admins.controller";
import { AdminRepository } from "./repositories/admin.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleRepository } from "./repositories/role.repository";
import { PermissionRepository } from "./repositories/permission.repository";
import { PermissionsController } from "./permission/permissions.controller";
import { RolesController } from "./role/roles.controller";
import { PermissionsService } from "./permission/permissions.service";
import { RolesService } from "./role/roles.service";
import { TokenService } from "./token/token.service";
import { TokenRepository } from "./repositories/token.repository";
import { AuthModule } from "../auth/auth.module";
import { AdminModuleController } from "./list/admin-module.controller";
import { Admin } from "@/modules/admins/entities/Admin.entity";
import { Role } from "@/modules/admins/entities/Role.entity";
import { Permission } from "@/modules/admins/entities/Permission.entity";
import { Token } from "@/modules/admins/entities/Token.entity";
import { UsersModule } from "../users/users.module";

@Module({
  controllers: [
    AdminsController,
    PermissionsController,
    RolesController,
    AdminModuleController,
  ],
  imports: [
    TypeOrmModule.forFeature([Admin, Role, Permission, Token]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],

  providers: [
    // services
    AdminsService,
    PermissionsService,
    RolesService,
    TokenService,

    // repositories
    RoleRepository,
    PermissionRepository,
    AdminRepository,
    TokenRepository,
  ],
  exports: [
    // services
    AdminsService,
    TokenService,
    PermissionsService,
    RolesService,
    AdminsService,

    // repositories
    RoleRepository,
    PermissionRepository,
    AdminRepository,
    
  ],
})
export class AdminsModule {}
