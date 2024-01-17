import { Role } from "./../../modules/admins/entities/Role.entity";
import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class RoleDatabaseSeed implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<void> {

    const repository = dataSource.getRepository(Role);

    const data = {
      name: "Super Admin",
      slug: "superadmin",
      description: "Super Admin Role",
    };

    const role = await repository.findOneBy({ slug: data.slug });

    // Insert only one record with this username.
    if (!role) {
      await repository.insert([data]);
    }
  }
}
