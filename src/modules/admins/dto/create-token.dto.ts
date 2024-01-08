import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty,  } from "class-validator";
import { Type } from "class-transformer";
import { Admin } from "../entities/Admin.entity";


export class CreateTokenDto {
  @Type (() => Admin)
  @ApiProperty({ type: Admin })
  @IsNotEmpty()
  admin: Admin;

  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  token: string;

  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  ip: string | null;

  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  userAgent: string;

  @Type (() => Date)
  @ApiProperty({ type: Date })
  @IsNotEmpty()
  expires_at: Date;
}
