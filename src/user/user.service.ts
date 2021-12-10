import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dtos/sign-up.dto';
import { hashPassword } from 'src/common/utils/handle-password';
import { FindConditions, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  findById(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findOne(filter: FindConditions<User>): Promise<User> {
    return await this.usersRepository.findOne({ where: filter });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
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
