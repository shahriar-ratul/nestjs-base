import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { Request } from "express";
import { AdminsService } from "../admins/admin/admins.service";
import { Public } from "./decorators/public.decorator";
import { SkipThrottle } from "@nestjs/throttler";
import { TokenService } from "../admins/token/token.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private _adminsService: AdminsService,
    private tokenService: TokenService,
    private jwtService: JwtService,
  ) {}

  /**
   * Login users
   */
  @SkipThrottle()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ApiTags("login")
  @ApiResponse({
    status: 200,
    description: "Login Successful",
  })
  @Public()
  async login(
    @Body() credential: LoginDto,
    @Req() request: Request,
    // @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    try {
      // return await this.authService.login(credential, request);

      const user = await this._adminsService.findByUsernameOrEmail(
        credential.username,
      );

      if (!user) {
        throw new Error("invalid credentials");
      }

      if (!(await bcrypt.compare(credential.password, user.password))) {
        throw new Error("Password is incorrect");
      }

      if (user.base.is_active == false) {
        throw new Error("Your Have Been Blocked. Please Contact Admin");
      }

      const payload = {
        // username: user.username,
        // email: user.email,
        sub: user.id,
      };

      const token = await this.jwtService.signAsync(payload);

      // 1d  = 1 day = 24 hours

      let ip =
        request.headers["x-forwarded-for"] || request.socket.remoteAddress;

      // convert ip to string
      ip = ip.toString();

      try {
        await this.tokenService.create({
          token: token,
          admin: user,
          ip: ip,
          userAgent: request.headers["user-agent"],
          expires_at: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        });
      } catch (error) {
        // console.log(error);
        throw new BadRequestException("Failed to create token");
      }

      return { access_token: token };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @SkipThrottle()
  @UseGuards(JwtAuthGuard)
  @ApiTags("profile")
  @ApiResponse({
    status: 200,
    description: "Get Profile Successful",
  })
  @Get("profile")
  async getProfile(@Req() req: Request) {
    const id = req.user["id"] as number;

    const user = await this._adminsService.findById(id);

    return user;
  }

  @SkipThrottle()
  @UseGuards(JwtAuthGuard)
  @ApiTags("verify")
  @ApiResponse({
    status: 200,
    description: "Verify Successful",
  })
  @Get("verify")
  async me() {
    return {
      message: "success",
    };
  }
}
