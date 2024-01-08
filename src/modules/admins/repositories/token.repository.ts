import { Token } from "@/modules/admins/entities/Token.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class TokenRepository extends Repository<Token> {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {
    super(
      tokenRepository.target,
      tokenRepository.manager,
      tokenRepository.queryRunner,
    );
  }

  async findByToken(token: string): Promise<Token> {
    return await this.tokenRepository.findOne({
      where: {
        token: token,
      },
    });
  }
}
