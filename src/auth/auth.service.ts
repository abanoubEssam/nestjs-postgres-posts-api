import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { comparePasswords } from 'src/common/utils/handle-password';
import { GenerateTokenProvider } from 'src/global/providers/generate-token.provider';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { CreateUserDto } from './dtos/sign-up.dto';
import { AuthResponse } from './interfaces/auth-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _generateTokenProvider: GenerateTokenProvider,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<AuthResponse> {
    const user = await this._userService.createUser(createUserDto);
    return {
      user,
      accessToken: this._generateTokenProvider.generateAccessToken(user.id),
      refreshToken: this._generateTokenProvider.generateAccessToken(user.id),
    };
  }

  async login(loginUserDto: LoginDto): Promise<AuthResponse> {
    console.log("🚀 ~ file: auth.service.ts ~ line 27 ~ AuthService ~ login ~ loginUserDto", loginUserDto)
    const user = await this._validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    console.log("🚀 ~ file: auth.service.ts ~ line 32 ~ AuthService ~ login ~ user", user)
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Not Allowed!',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return {
      user,
      accessToken: this._generateTokenProvider.generateAccessToken(user.id),
      refreshToken: this._generateTokenProvider.generateAccessToken(user.id),
    };
  }

  private async _validateUser(
    email: string,
    pass: string,
  ): Promise<UserEntity | null> {
    const user = await this._userService.findOne({ email });
    if (!user) {
      return null
    }
    const matchedPassword = await comparePasswords({
      candidatePassword: pass,
      userPassword: user.password,
    });
    if (user && matchedPassword) {
      return user;
    }
    return null;
  }
}
