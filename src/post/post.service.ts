import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PaginatedResponse } from 'src/common/utils/paginated-response';
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

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<PostEntity>> {
    const page = paginationDto.page || 1;
    const limit = paginationDto.limit || 10;

    const [posts, count] = await this._postRepository.findAndCount({
      skip: (page - 1) * limit,
      take: paginationDto.limit,
      relations: [
        'owner',
        'comments',
        'comments.owner',
        'likes',
        'likes.owner',
      ],
    });

    return new PaginatedResponse({
      data: posts,
      totalCount: count,
      page,
      limit,
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

  async incrementLikesCount(postId: number) {
    return await this._postRepository.increment(
      { id: postId },
      'likesCount',
      1,
    );
  }

  async decrementLikesCount(postId: number) {
    return await this._postRepository.decrement(
      { id: postId },
      'likesCount',
      1,
    );
  }
}
