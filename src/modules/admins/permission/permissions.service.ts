import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PermissionRepository } from "../repositories/permission.repository";
import { Like } from "typeorm";
import { PageDto, PageMetaDto, PageOptionsDto } from "@/common/dto";
import { CreatePermissionDto } from "../dto/create-permission.dto";
import { Permission } from "../entities/Permission.entity";

@Injectable()
export class PermissionsService {
  constructor(private readonly _permissionRepository: PermissionRepository) {}

  async findAll(query: PageOptionsDto): Promise<PageDto<Permission>> {
    const limit: number = query.limit || 10;
    const page: number = query.page || 1;
    const skip: number = (page - 1) * limit;
    const search = query.search || "";

    const sort = query.sort || "id";

    const order = query.order || "ASC";

    const data = await this._permissionRepository.findAndCount({
      where: { name: Like("%" + search + "%") },
      take: limit,
      skip: skip,
      order: {
        [sort]: order.toUpperCase(),
      },
    });
    const [result, itemCount] = data;

    const pageOptionsDto = {
      limit: limit,
      page: page,
      skip: skip,
    };

    const pageMetaDto = new PageMetaDto({
      total: itemCount,
      pageOptionsDto: pageOptionsDto,
    });

    return new PageDto(result, pageMetaDto);
  }

  async findOne(id: number): Promise<Permission> {
    return await this._permissionRepository.findOneBy({
      id: id,
    });
  }

  async create(createPermissionDto: CreatePermissionDto) {
    const checkPermission = await this._permissionRepository.exist({
      where: [
        {
          slug: createPermissionDto.slug,
        },
        {
          name: createPermissionDto.name,
        },
      ],
    });
    // console.log(checkPermission);
    if (checkPermission == true) {
      throw new HttpException(
        "Permission already exists",
        HttpStatus.BAD_REQUEST
      );
    }

    const permission = this._permissionRepository.create(createPermissionDto);
    await this._permissionRepository.save(permission);
    return {
      message: "Permission created successfully",
    };
  }

  // getAllPermissions
  async getAllPermissions() {
    try {
      const permissions = await this._permissionRepository.find({
        order: {
          slug: "ASC",
        },
      });

      const groupedPermissions = [];

      permissions.forEach((permission) => {
        const { group, name } = permission;

        if (!group || !name) {
          console.error("Invalid permission object:", permission);
          return; // Skip invalid permissions
        }

        let existingGroup = groupedPermissions.find(
          (groupItem) => groupItem.groupName === group
        );

        if (!existingGroup) {
          existingGroup = {
            groupName: group,
            permissions: [],
          };
          groupedPermissions.push(existingGroup);
        }

        existingGroup.permissions.push(permission);
      });

      // Sort the groupedPermissions array alphabetically by group name
      groupedPermissions.sort((a, b) => a.groupName.localeCompare(b.groupName));

      // Sort the permissions in each group alphabetically by name
      groupedPermissions.forEach((group) => {
        group.permissions.sort((a, b) => a.name.localeCompare(b.name));
      });

      // console.log(groupedPermissions); // For debugging

      // missing permissions
      /*  const missingPermissions = [];
      groupedPermissions.forEach((group) => {
        group.permissions.forEach((permission) => {
          if (!permission.group) {
            missingPermissions.push(permission);
          }
        });
      });

      if (missingPermissions.length) {
        console.warn(
          "The following permissions don't have a group assigned:",
          missingPermissions
        );
      } */

      // console.log(groupedPermissions);
      return {
        message: "Permissions retrieved successfully",
        total: permissions.length,
        permissions: groupedPermissions,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to retrieve permissions");
    }
  }
}
