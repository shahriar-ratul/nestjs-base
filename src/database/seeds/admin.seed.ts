import { Factory, Seeder } from "typeorm-seeding";
import { DataSource } from "typeorm";
import { Admin } from "./../../modules/admins/entities/Admin.entity";
import { hash } from "bcrypt";
import { Role } from "./../../modules/admins/entities/Role.entity";
import { Permission } from "./../../modules/admins/entities/Permission.entity";

export default class AdminDatabaseSeed implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Admin);

    const data = {
      email: "admin@admin.com",
      username: "super_admin",
      phone: "super_admin",
      password: await hash("password", 15),
      // isActive : true,
    };

    const item = await repository.findOneBy({ username: data.username });

    // Insert only one record with this username.
    if (!item) {
      await repository.insert([data]);
    }

    const role = await dataSource
      .getRepository(Role)
      .findOneBy({ slug: "superadmin" });

    if (role) {
      const admin = await repository.findOneBy({ username: data.username });

      if (admin) {
        // check if admin has role

        // add role to admin
        // await repository
        //   .createQueryBuilder()
        //   .relation(Admin, "roles")
        //   .of(admin)
        //   .add(role);

        admin.roles = [role];
        await repository.save(admin);

        // add permissions to role
        const permissions = await dataSource.getRepository(Permission).find();

        if (permissions) {
          // await repository
          //   .createQueryBuilder()
          //   .relation(Role, "permissions")
          //   .of(role)
          //   .add(permissions);

          role.permissions = permissions;
          await dataSource.getRepository(Role).save(role);
        }
      }
    }

   
  }
}