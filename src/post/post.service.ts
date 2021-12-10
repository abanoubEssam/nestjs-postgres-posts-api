import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { FindConditions, Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private _postRepository: Repository<PostEntity>,
  ) {}

  async findAll(): Promise<PostEntity[]> {
    return await this._postRepository.find({
      relations: ['owner'],
    });
  }

  findById(id: number): Promise<PostEntity> {
    return this._postRepository.findOne(id, { relations: ['owner'] });
  }

  async findOne(filter: FindConditions<PostEntity>): Promise<PostEntity> {
    return await this._postRepository.findOne({
      where: filter,
      relations: ['owner'],
    });
  }

  async createPost(
    currentUser: UserEntity,
    createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    return await this._postRepository.save({
      owner: currentUser,
      ...createPostDto,
    });
  }
}
