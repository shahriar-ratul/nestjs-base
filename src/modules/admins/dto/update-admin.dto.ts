import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  MaxLength,
} from "class-validator";
export class UpdateAdminDto {
  @ApiProperty({
    type: "string",
    example: "admin@admin.com",
    description: "admin email",
  })
  @IsEmail()
  @MaxLength(100)
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: "string",
    example: "123456",
    description: "admin password",
  })
  @IsNotEmpty()
  @MaxLength(255)
  password: string;

  @ApiProperty({
    type: "string",
    example: "phone",
    description: "admin phone",
  })
  @IsNotEmpty()
  @MaxLength(255)
  phone: string;

  @ApiProperty({
    type: "string",
    example: "admin",
    description: "admin username",
  })
  @IsNotEmpty()
  @MaxLength(255)
  username: string;

  @ApiProperty({
    type: "string",
    example: "true",
    description: "admin is_active",
  })
  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    type: "array",
    example: "roles",
    description: "admin roles",
    isArray: true,
  })
  
  @IsArray()
  @ArrayNotEmpty({
    message: "At least 1 role is required",
  })
  roles: string[];


}
