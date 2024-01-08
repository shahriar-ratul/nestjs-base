/* eslint-disable prefer-destructuring */
// src/guards/ability.guard.ts

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AbilityFactory } from "./ability.factory";
import { AdminsService } from "../../admins/admin/admins.service";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class AbilityGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly abilityFactory: AbilityFactory,
    private readonly adminsService: AdminsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handler = context.getHandler();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    // user
    const user = context.switchToHttp().getRequest().user;

    const admin = await this.adminsService.findById(user.id);

    // console.log("admin", admin);

    const ability = this.abilityFactory.defineAbilitiesFor(admin.permissions);

    // user
    // console.log("user", context.switchToHttp().getRequest().user);

    // console.log("ability", ability);
    const requiredPermissions = this.reflector.get<string[]>(
      "permissions",
      handler,
    );

    // console.log("requiredPermissions", requiredPermissions);

    if (!requiredPermissions) {
      return true; // No permissions required, allow access
    }

    const [action, resource] = requiredPermissions;

    if (!ability.can(action, resource)) {
      throw new ForbiddenException(
        "You do not have permission to access this resource",
      );
    }

    return true;
  }
}
