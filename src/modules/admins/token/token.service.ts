import { Injectable } from "@nestjs/common";

import { AdminRepository } from "../repositories/admin.repository";
import { TokenRepository } from "../repositories/token.repository";
import { CreateTokenDto } from "../dto/create-token.dto";
import { Token } from "../entities/Token.entity";

@Injectable()
export class TokenService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly tokenRepository: TokenRepository,
  ) {}

  async create(createTokenDto: CreateTokenDto) {
    const token = new Token();

    token.token = createTokenDto.token;
    token.ip = createTokenDto.ip;
    token.user_agent = createTokenDto.userAgent;
    token.expires_at = createTokenDto.expires_at;
    token.admin = createTokenDto.admin;
    token.created_at = new Date();

    return await this.tokenRepository.save(token);
  }

  async findById(id: number) {
    return await this.adminRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByAdminId(adminId: number) {
    return await this.tokenRepository.find({
      relations: {
        admin: true,
      },
      where: {
        admin: {
          id: adminId,
        },
      },
    });
  }

  async findByToken(token: string) {
    return await this.tokenRepository.findByToken(token);
  }

  // isRevokedToken
  async isRevokedToken(token: string) {
    const tokenData = await this.tokenRepository.findByToken(token);

    if (!tokenData) {
      return false;
    }

    if (tokenData.isRevoked) {
      return true;
    }

    return false;
  }
}
