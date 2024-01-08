import { Role } from "@/modules/admins/entities/Role.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


export class RoleRepository extends Repository<Role> {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {
    super(
      roleRepository.target,
      roleRepository.manager,
      roleRepository.queryRunner,
    );
  }

  // sample method for demo purposes
  /*  async findByEmail(email: string): Promise<Role> {
    return await this.roleRepository.findOneBy({ email }); 
    // could also be this.findOneBy({ email });, but depending on your IDE/TS settings, could warn that roleRepository is not used though. Up to you to use either of the 2 methods
  } */

  // your other custom methods in your repo...
}
