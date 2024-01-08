import { BaseOrmEntity } from "@/common/helpers/BaseOrmEntity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Admin } from "./Admin.entity";
import { Permission } from "./Permission.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("roles")
export class Role {
  @ApiProperty({ type: "integer", description: "role id" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: "varchar", description: "role name" })
  @Column({ type: "varchar", unique: true })
  name: string;

  @ApiProperty({ type: "varchar", description: "role slug" })
  @Column({ type: "varchar", unique: true })
  slug: string;

  @Column(() => BaseOrmEntity, { prefix: false })
  base: BaseOrmEntity;

  @ManyToMany(() => Admin, admin => admin.roles)
  @JoinTable({
    name: "admin_role",
    joinColumn: {
      name: "role_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "admin_id",
      referencedColumnName: "id",
    },
  })
  admins: Admin[];

  @ManyToMany(() => Permission, permission => permission.roles)
  @JoinTable({
    name: "role_permission",
    joinColumn: {
      name: "role_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "permission_id",
      referencedColumnName: "id",
    },
  })
  permissions: Permission[];
}
