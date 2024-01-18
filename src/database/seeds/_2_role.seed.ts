import { Role } from "../../modules/admins/entities/Role.entity";
import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Permission } from "../../modules/admins/entities/Permission.entity";

export default class RoleDatabaseSeed implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<void> {

    const _repository = dataSource.getRepository(Role);

    const _permissionRepository = dataSource.getRepository(Permission);

    // Before your operations  
    // await _repository.query('SET FOREIGN_KEY_CHECKS=0');

    const data = {
      name: "Super Admin",
      slug: "superadmin",
      description: "Super Admin Role",
    };

    const existingRole = await _repository.findOneBy({ slug: data.slug });

    // Insert only one record with this username.
    if (!existingRole) {
      const savedRole = await _repository.save({ ...data });

      const permissions = await _permissionRepository.find({});

      console.log("Permissions", permissions);
      if (permissions) {
        savedRole.permissions = permissions;
        await _repository.save(savedRole);
      } else {
        console.log("No permissions found");
      }
     
    }else{
      existingRole.permissions = [];

      await _repository.save(existingRole);

      const permissions = await _permissionRepository.find();

      if (permissions) {
        existingRole.permissions = permissions;
        await _repository.save(existingRole);

        console.log("Permissions updated");
      } else {
        console.log("No permissions found");
      }
     
      
    }

    // After your operations
    // await _repository.query('SET FOREIGN_KEY_CHECKS=1');
    

  }
}
