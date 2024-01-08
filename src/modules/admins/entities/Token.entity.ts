import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Admin } from "./Admin.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("tokens")
export class Token {
  @ApiProperty({ type: "integer", description: "role id" })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Admin, admin => admin.tokens, { onDelete: "CASCADE" })
  @JoinColumn({ name: "admin_id", referencedColumnName: "id" })
  admin: Admin;

  @ApiProperty({ type: "varchar", description: "token" })
  @Column()
  token: string;

  @ApiProperty({ type: "varchar", description: "token ip" })
  @Column({ nullable: true })
  ip: string;

  @ApiProperty({ type: "varchar", description: "token user agent" })
  @Column({ nullable: true })
  user_agent: string;

  @ApiProperty({ type: "varchar", description: "token expires at" })
  @Column()
  expires_at: Date;

  @ApiProperty({ type: "varchar", description: "token revoked" })
  @Column({ default: false })
  isRevoked: boolean;

  @ApiProperty({ type: "varchar", description: "token revoked at" })
  @Column({ nullable: true })
  revoked_at: Date;

  @ApiProperty({ type: "varchar", description: "token revoked by ip" })
  @Column({ nullable: true })
  revoked_by_ip: string;

  @ApiProperty({ type: "varchar", description: "token revoked by user agent" })
  @Column({ nullable: true })
  revoked_by_user_agent: string;

  @ApiProperty({ type: "varchar", description: "token created at" })
  @Column()
  created_at: Date;
}
