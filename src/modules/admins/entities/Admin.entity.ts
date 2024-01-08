import { BaseOrmEntity } from "@/common/helpers/BaseOrmEntity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Role } from "./Role.entity";
import { Permission } from "./Permission.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Token } from "./Token.entity";

@Entity({ name: "admins" })
export class Admin {
  @ApiProperty({ type: "integer", description: "admin id" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: "varchar",
    description: "admin username must be unique",
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ type: "varchar", description: "admin email must be unique" })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ type: "varchar", description: "admin phone must be unique" })
  @Column({ nullable: true, unique: true })
  phone: string;

  @Column()
  password: string;

  @Column(() => BaseOrmEntity, { prefix: false })
  base: BaseOrmEntity;


  // permissions: Permission[];
  @ManyToMany(() => Permission)
  @JoinTable({
    name: "admin_permission",
    joinColumn: {
      name: "admin_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "permission_id",
      referencedColumnName: "id",
    },
  })
  permissions: Permission[];

  // roles: Role[];
  @ManyToMany(() => Role)
  @JoinTable({
    name: "admin_role",
    joinColumn: {
      name: "admin_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "role_id",
      referencedColumnName: "id",
    },
  })
  roles: Role[];

  @OneToMany(() => Token, token => token.admin)
  tokens: Token[];

}
