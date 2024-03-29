import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  // async validate(payload: any) {
  //   const { email, sub } = payload;
  //   console.log(payload + 'payload');
  //   return { email, password: sub.password };
  // }

  async validate(payload: any) {
    return {
      id: payload.sub,
    };
  }
}
