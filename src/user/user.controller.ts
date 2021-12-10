import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private _userSerivce: UserService) {}

  @Get()
  async findAllUsers():Promise<UserEntity[]>{
    return this._userSerivce.findAll()
  }


  @Get('/:userId')
  async findUser(@Param('userId') userId: number) {
    return this._userSerivce.findById(userId);
  }
}
