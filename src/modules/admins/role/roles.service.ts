import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { CreateRoleDto } from "../dto/create-role.dto";
import { UpdateRoleDto } from "../dto/update-role.dto";
import { RoleRepository } from "../repositories/role.repository";
import { PageDto, PageMetaDto, PageOptionsDto } from "@/common/dto";
import { In, Like } from "typeorm";
import { generateSlug } from "@/common/helpers/GenerateHelpers";
import { PermissionRepository } from "../repositories/permission.repository";
import { Role } from "../entities/Role.entity";

@Injectable()
export class RolesService {
  constructor(
    private readonly _roleRepository: RoleRepository,
    private readonly _permissionRepository: PermissionRepository,
  ) {}

  async findAll(query: PageOptionsDto): Promise<PageDto<Role>> {
    const limit: number = query.limit || 10;
    const page: number = query.page || 1;
    const skip: number = (page - 1) * limit;
    const search = query.search || "";

    const sort = query.sort || "id";

    const order = query.order || "ASC";

    const data = await this._roleRepository.findAndCount({
      relations: ["permissions"],
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

  async findOne(id: number) {
    return await this._roleRepository.findOne({
      relations: ["permissions"],
      where: {
        id: id,
      },
    });
  }

  async create(createRoleDto: CreateRoleDto) {
    // convert name to slug
    const slug = generateSlug(createRoleDto.name);

    const checkRole = await this._roleRepository.exist({
      where: [
        {
          slug: slug,
        },
        {
          name: createRoleDto.name,
        },
      ],
    });

    if (checkRole) {
      throw new HttpException("Role already exists", HttpStatus.BAD_REQUEST);
    }

    const role = await this._roleRepository.create({
      name: createRoleDto.name,
      slug: slug, 
      isActive: createRoleDto.is_active,
     
      
    });

    // console.log(createRoleDto.permissions);

    const permissions = await this._permissionRepository.findBy({
      id: In(createRoleDto.permissions),
    });

    role.permissions = permissions;

    await this._roleRepository.save(role);

    return {
      message: "Role created successfully",
      data: role,
      permissions: role.permissions,
    };
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    console.log(updateRoleDto);
    // convert name to slug
    const slug = generateSlug(updateRoleDto.name);

    // update role not working

    const role = await this._roleRepository.findOne({
      relations: ["permissions"],
      where: {
        id: id,
      },
    });

    if (!role) {
      throw new HttpException("Role not found", HttpStatus.BAD_REQUEST);
    }

    role.name = updateRoleDto.name;
    role.slug = slug;
    role.isActive = updateRoleDto.is_active;

    role.permissions = [];
    await this._roleRepository.save(role);

    const permissions = await this._permissionRepository.findBy({
      id: In(updateRoleDto.permissions),
    });

    role.permissions = permissions;

    await this._roleRepository.save(role);

    return {
      message: "Role Updated successfully",
      data: role,
      permissions: role.permissions,
    };
  }

  async remove(id: number) {
    const role = await this._roleRepository.findOne({
      relations: ["admins", "permissions"],
      where: {
        id: id,
      },
    });

    if (!role) {
      throw new HttpException("Role not found", HttpStatus.BAD_REQUEST);
    }

    if (role.admins.length > 0) {
      throw new HttpException(
        "Role is in use it cannot be deleted",
        HttpStatus.BAD_REQUEST,
      );
    }

    // superadmin role cannot be deleted
    if (role.slug === "superadmin" || role.slug === "admin") {
      throw new HttpException(
        "Superadmin cannot be deleted",
        HttpStatus.BAD_REQUEST,
      );
    }

    // await this._roleRepository.remove(role);
    await this._roleRepository.softRemove(role);


    return {
      message: "Role deleted successfully",
    };
  }

  async changeStatus(id: number) {
    const role = await this._roleRepository.findOneBy({
      id: id,
    });

    if (!role) {
      throw new HttpException("Role not found", HttpStatus.BAD_REQUEST);
    }

    role.isActive = !role.isActive;

    await this._roleRepository.save(role);

    return {
      message: "Status Changed successfully",
    };
  }

  // getAllRoles
  async getAllRoles() {
    const roles = await this._roleRepository.find({
      // relations: ["permissions"],
      where: {
          isActive: true,
      },
    });

    return {
      message: "Roles fetched successfully",
      roles: roles,
    };
  }
}
