import { ApiProperty } from "@nestjs/swagger";
import { Column, DeleteDateColumn } from "typeorm";

export abstract class BaseOrmEntity {
  @ApiProperty({ type: "boolean", description: "item is active or not" })
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({ type: "timestamp", description: "item created at" })
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @ApiProperty({ type: "timestamp", description: "item updated at" })
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @ApiProperty({ type: "timestamp", description: "item deleted at" })
  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at: Date;
}
