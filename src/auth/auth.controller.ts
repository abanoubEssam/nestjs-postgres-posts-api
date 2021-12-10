import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { CreateUserDto } from './dtos/sign-up.dto';
import { AuthResponse } from './interfaces/auth-response.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/sign-up')
  @Public()
  async signUp(@Body() createUserDto: CreateUserDto): Promise<AuthResponse> {
    return this._authService.signUp(createUserDto);
  }

  @Post('/login')
  @Public()
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this._authService.login(loginDto);
  }
}
