import {
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { AdminsService } from "../admins/admin/admins.service";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import { TokenService } from "../admins/token/token.service";


@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async login(credential: LoginDto, request): Promise<any> {
    const user = await this.adminsService.findByUsernameOrEmail(
      credential.username,
    );

    if (!user) {
      throw new Error("invalid credentials");
    }

    if (!(await bcrypt.compare(credential.password, user.password))) {
      throw new Error("invalid credentials");
    }

    const payload = {
      // username: user.username,
      // email: user.email,
      sub: user.id,
    };

    const token = await this.jwtService.signAsync(payload);

    // 1d  = 1 day = 24 hours

    const ip =
      request.headers["x-forwarded-for"] || request.socket.remoteAddress;

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

    // response.cookie("access_token", token, {
    //   httpOnly: true,
    // });

    // response.cookie("access_token", token, {
    //   httpOnly: true,
    //   expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    // });

    return { access_token: token };

  }

  async doesPasswordMatch(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword); // true
  }

  async validateUser(email: string, password: string) {
    const user = await this.adminsService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordMatching = await this.doesPasswordMatch(
      password,
      user.password,
    );

    console.log('isPasswordMatching', isPasswordMatching);

    if (!isPasswordMatching) {
      throw new Error('Invalid credentials');
    }
    return { name: user.username, email: user.email };
  }

  async verifyJwt(jwt: string) {
    const { exp } = await this.jwtService.verifyAsync(jwt);

    if (exp < Date.now()) {
      throw new Error('Token expired');
    }

    return { exp };
  }
}
