import { ApiProperty } from "@nestjs/swagger";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Admin } from "./Admin.entity";
import { Role } from "./Role.entity";

@Entity({ name: "permissions" })
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: "varchar", description: "permission name" })
  @Column({ type: "varchar", unique: true })
  name: string;

  @ApiProperty({ type: "varchar", description: "permission slug" })
  @Column({ type: "varchar", unique: true })
  slug: string;

  @ApiProperty({ type: "varchar", description: "permission group" })
  @Column({ type: "varchar", nullable: true })
  group: string;

  @ManyToMany(() => Admin, admin => admin.permissions)
  @JoinTable({
    name: "admin_permission",
    joinColumn: {
      name: "permission_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "admin_id",
      referencedColumnName: "id",
    },
  })
  admins: Admin[];

  @ManyToMany(() => Role, role => role.permissions)
  @JoinTable({
    name: "role_permission",
    joinColumn: {
      name: "permission_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "role_id",
      referencedColumnName: "id",
    },
  })
  roles: Role[];


  @ApiProperty({ description: 'When user was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'When user was updated' })
  @UpdateDateColumn()
  updatedAt: Date;
}
