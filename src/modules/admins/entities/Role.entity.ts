
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
import { Permission } from "./Permission.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("roles")
export class Role extends BaseEntity {
  @ApiProperty({ type: "integer", description: "role id" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: "varchar", description: "role name" })
  @Column({ type: "varchar", unique: true })
  name: string;

  @ApiProperty({ type: "varchar", description: "role slug" })
  @Column({ type: "varchar", unique: true })
  slug: string;

  @ApiProperty({ type: "varchar", description: "role description" })
  @Column({ type: "varchar", nullable: true })
  description: string;


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

  @ApiProperty({ type: "boolean", description: "item is active or not" })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'When user was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'When user was updated' })
  @UpdateDateColumn()
  updatedAt: Date;
}
