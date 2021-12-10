import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentVariables } from 'src/common/configuration/EnvironmentVariables';
import { UserService } from 'src/user/user.service';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _userService: UserService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.jwtSecret', { infer: true }),
    });
  }

  public async validate(payload: IJwtPayload, done: Function) {
    const user = await this._userService.findById(payload.sub);

    if (!user) {
      return done(
        new HttpException(
          { status: HttpStatus.FORBIDDEN, error: 'Not Allowed!' },
          HttpStatus.FORBIDDEN,
        ),
      );
    }

    done(null, user);
  }
}
