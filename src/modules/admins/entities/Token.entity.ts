import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  userAgent: string;

  @ApiProperty({ type: "varchar", description: "token expires at" })
  @Column()
  expiresAt: Date;

  @ApiProperty({ type: "varchar", description: "token revoked" })
  @Column({ default: false })
  isRevoked: boolean;

  @ApiProperty({ type: "varchar", description: "token revoked at" })
  @Column({ nullable: true })
  revokedAt: Date;

  @ApiProperty({ type: "varchar", description: "token revoked by ip" })
  @Column({ nullable: true })
  revokedByIp: string;

  @ApiProperty({ type: "varchar", description: "token revoked by user agent" })
  @Column({ nullable: true })
  revokedByUserAgent: string;


  @ApiProperty({ description: 'When user was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'When user was updated' })
  @UpdateDateColumn()
  updatedAt: Date;
}
