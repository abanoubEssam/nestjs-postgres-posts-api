import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dtos/sign-up.dto';
import { hashPassword } from 'src/common/utils/handle-password';
import { FindConditions, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find({ relations: ['posts'] });
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(id, {
      relations: ['posts'],
    });
    if (!user) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'user not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async findOne(filter: FindConditions<UserEntity>): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: filter });
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const checkMailTaken = await this.findOne({ email: createUserDto.email });
    if (checkMailTaken) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Email Already Taken!',
        },
        HttpStatus.CONFLICT,
      );
    }
    const hashedPassword = await hashPassword(createUserDto.password);
    return await this.usersRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });
  }
}
