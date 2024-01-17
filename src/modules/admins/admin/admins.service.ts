import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "../dto/create-admin.dto";
import { UpdateAdminDto } from "../dto/update-admin.dto";
import { AdminRepository } from "../repositories/admin.repository";
import { RoleRepository } from "../repositories/role.repository";
import { In, Like, Not } from "typeorm";
import { PageDto, PageMetaDto, PageOptionsDto } from "@/common/dto";
import { AdminResponse } from "../interface/AdminResponse";
import { hash } from "bcrypt";

@Injectable()
export class AdminsService {
  constructor(
    private readonly _adminRepository: AdminRepository,
    private readonly _roleRepository: RoleRepository,


  ) { }

  // get all admins
  async findAll(query: PageOptionsDto): Promise<PageDto<AdminResponse>> {
    const limit: number = query.limit || 10;
    const page: number = query.page || 1;
    const skip: number = (page - 1) * limit;
    const search = query.search || "";

    const sort = query.sort || "id";

    const order = query.order || "ASC";

    const data = await this._adminRepository.findAndCount({
      relations: [
        "roles",

      ],
      withDeleted: false,
      where: [
        { email: Like("%" + search + "%") },
        { username: Like("%" + search + "%") },
        {
          phone: Like("%" + search + "%"),
        },
      ],
      take: limit,
      skip: skip,
      order: {
        [sort]: order.toUpperCase(),
      },
    });
    const [result, itemCount] = data;

    const transformedResult = result.map(item => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      delete item.password;

  
      return item;
    });

    const pageOptionsDto = {
      limit: limit,
      page: page,
      skip: skip,
    };

    const pageMetaDto = new PageMetaDto({
      total: itemCount,
      pageOptionsDto: pageOptionsDto,
    });

    return new PageDto(transformedResult, pageMetaDto);
  }

  // add admin
  async create(createAdminDto: CreateAdminDto) {
    const checkAdmin = await this._adminRepository.exist({
      where: [
        { email: createAdminDto.email },
        { username: createAdminDto.username },
        { phone: createAdminDto.phone },
      ],
    });

    if (checkAdmin) {
      throw new HttpException("Admin already exists ", HttpStatus.BAD_REQUEST);
    }

    const password = await hash(createAdminDto.password, 15);


    const admin = this._adminRepository.create({
      email: createAdminDto.email,
      username: createAdminDto.username,
      phone: createAdminDto.phone,
      password: password,
      isActive: createAdminDto.is_active,
      
    });

    const role = await this._roleRepository.find({
      where: { id: In(createAdminDto.roles) },
    });

    admin.roles = role;

    await this._adminRepository.save(admin);

    return {
      message: "Admin Created Successfully",
    };

  }

  // get admin by id
  async findById(id: number) {
    const admin = await this._adminRepository.findOne({
      where: { id },
      relations: [
        "roles",
        ],
    });

    const role = await this._roleRepository.find({
      relations: ["permissions"],
      where: { id: In(admin.roles.map(role => role.id)) },
    });

    const permissions = role.map(role => role.permissions).flat();

    const uniquePermissions = permissions.filter(
      (permission, index, self) =>
        index === self.findIndex(t => t.id === permission.id),
    );

    const permissionSlugs = uniquePermissions.map(
      permission => permission.slug,
    );

    // sort permissions by name
    permissionSlugs.sort();

    delete admin.password;

   
    const adminResponse: AdminResponse = {
      ...admin,
    };

    return {
      user: adminResponse,
      permissions: permissionSlugs,
    };
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const data = await this._adminRepository.exist({
      where: [
        {
          id: Not(id),
        },
      ],
    });

    if (!data) {
      throw new HttpException("Admin Not Found ", HttpStatus.BAD_REQUEST);
    }

    const checkAdmin = await this._adminRepository.exist({
      where: [
        { email: updateAdminDto.email, id: Not(id) },
        { username: updateAdminDto.username, id: Not(id) },
        { phone: updateAdminDto.phone, id: Not(id) },
      ],
    });

    if (checkAdmin) {
      throw new HttpException("Admin already exists ", HttpStatus.BAD_REQUEST);
    }

    const is_active = updateAdminDto.is_active ? true : false;

    const admin = await this._adminRepository.findOne({
      where: { id },
      relations: ["roles", "images"],
    });

    admin.email = updateAdminDto.email;
    admin.username = updateAdminDto.username;
    admin.phone = updateAdminDto.phone;
  
    if (updateAdminDto.password) {
      const password = await hash(updateAdminDto.password, 15);
      admin.password = password;
    }
    admin.isActive = is_active;

    if (updateAdminDto.roles.length > 0) {
      admin.roles = [];
      const role = await this._roleRepository.find({
        where: { id: In(updateAdminDto.roles) },
      });

      admin.roles = role;
      this._adminRepository.save(admin);
    }

    await this._adminRepository.save(admin);

    return {
      message: "Admin Updated Successfully",
    };
  }

  async remove(id: number) {
    const admin = await this._adminRepository.findOne({
      relations: ["roles", "images"],
      where: {
        id: id,
      },
    });

    if (!admin) {
      throw new HttpException("Admin not found", HttpStatus.BAD_REQUEST);
    }

    if (admin.roles.length > 0) {
      // superadmin role cannot be deleted
      if (admin.roles.find(role => role.slug === "superadmin")) {
        throw new HttpException(
          "SuperAdmin role cannot be deleted",
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // admin.roles = [];

    // await this._adminRepository.remove(admin);

    await this._adminRepository.softDelete({ id: id });

    return {
      message: "Admin deleted successfully",
    };
  }

  async changeStatus(id: number) {
    const admin = await this._adminRepository.findOneBy({
      id: id,
    });

    if (!admin) {
      throw new HttpException("Admin not found", HttpStatus.BAD_REQUEST);
    }

    admin.isActive = !admin.isActive;

    await this._adminRepository.save(admin);

    return {
      message: "Status Changed successfully",
    };
  }

  async findByUsername(username: string) {
    return this._adminRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string) {
    return this._adminRepository.findOne({ where: { email } });
  }


  async findOne(id: number) {
    return this._adminRepository.findOne({ where: { id } });
  }



  async findByUsernameOrEmail(username: string) {
    // check if username or email exists
    return this._adminRepository.findOne({
      where: [{ username }, { email: username }],
    });
  }

  async getPermissions(id: number) {
    const admin = await this._adminRepository.findOne({
      where: { id },
      relations: ["roles"],
    });

    const role = await this._roleRepository.find({
      relations: ["permissions"],
      where: { id: In(admin.roles.map(role => role.id)) },
    });

    const permissions = role.map(role => role.permissions).flat();

    const uniquePermissions = permissions.filter(
      (permission, index, self) =>
        index === self.findIndex(t => t.id === permission.id),
    );

    const permissionSlugs = uniquePermissions.map(
      permission => permission.slug,
    );

    return {
      permissions: permissionSlugs,
    };
  }

  // getAllAdmins
  async getAllAdmins() {
    const items = await this._adminRepository.find({
      where: {  isActive: true  },
    });

    return {
      message: "Items fetched successfully",
      items: items,
    };
  }
}
