import { Permission } from "../../modules/admins/entities/Permission.entity";
import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class PermissionDatabaseSeed implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<void> {

    const repository = dataSource.getRepository(Permission);

    const data = [
      {
        name: "Dashboard",
        slug: "dashboard",
        group: "dashboard",
      },
     
      {
        name: "Data Backup",
        slug: "data.backup",
        group: "setting",
      },

      {
        name: "Data Restore",
        slug: "data.restore",
        group: "setting",
      },
    ];

    data.map(async (item) => {
      const permission = await repository.findOne({
        where: { slug: item.slug },
      });
      if (!permission) {
        await repository.save({
          name: item.name,
          slug: item.slug,
          group: item.group,
        });
      }
    });
  }
}
