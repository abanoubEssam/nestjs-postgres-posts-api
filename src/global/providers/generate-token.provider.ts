import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/common/configuration/EnvironmentVariables';

@Injectable()
export class GenerateTokenProvider {
    constructor(
        private readonly _configService: ConfigService<EnvironmentVariables>
    ) { }

    generateAccessToken(
        id: number,
    ) {
        const jwtConfig = this._configService.get('auth' , {infer: true});
        return this._generateAccessToken({
            userId: id,
            tokenSecret: jwtConfig.jwtSecret,
            expiresIn: jwtConfig.jwtLifetime,
        });
    }

    private _generateAccessToken({ userId, tokenSecret, expiresIn }) {
        return jwt.sign(
            {
                sub: userId,
                iss: tokenSecret,
                iat: new Date().getTime() / 1000,
            },
            tokenSecret,
            { expiresIn },
        );
    }

}
