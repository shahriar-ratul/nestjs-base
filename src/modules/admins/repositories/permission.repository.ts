import { Permission } from "@/modules/admins/entities/Permission.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


export class PermissionRepository extends Repository<Permission> {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {
    super(
      permissionRepository.target,
      permissionRepository.manager,
      permissionRepository.queryRunner,
    );
  }

  // sample method for demo purposes
  /*  async findByEmail(email: string): Promise<Permission> {
    return await this.permissionRepository.findOneBy({ email }); 
    // could also be this.findOneBy({ email });, but depending on your IDE/TS settings, could warn that permissionRepository is not used though. Up to you to use either of the 2 methods
  } */

  // your other custom methods in your repo...
}
