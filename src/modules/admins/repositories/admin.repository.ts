import { Admin } from "@/modules/admins/entities/Admin.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class AdminRepository extends Repository<Admin> {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {
    super(
      adminRepository.target,
      adminRepository.manager,
      adminRepository.queryRunner,
    );
  }
}
