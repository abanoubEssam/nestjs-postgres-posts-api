import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PaginatedResponse } from 'src/common/utils/paginated-response';
import { PostService } from 'src/post/post.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LikeEntity } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private _likeRepository: Repository<LikeEntity>,
    private _postService: PostService,
  ) {}

  async findPostLikes(postId: number, paginationDto: PaginationDto) {
    await this._checkPostExists(postId);
    const page = paginationDto.page || 1;
    const limit = paginationDto.limit || 10;

    const [likes, count] = await this._likeRepository.findAndCount({
      skip: (page - 1) * limit,
      take: paginationDto.limit,
      where: { post: postId },
      relations: ['owner', 'post'],
    });
    return new PaginatedResponse({
      page,
      limit,
      totalCount: count,
      data: likes,
    });
  }

  async likePost(postId: number, currentUser: UserEntity) {
    await this._checkPostExists(postId);
    const checkAlreadyLiked = await this._checkAlreadyLiked(
      postId,
      currentUser,
    );

    if (checkAlreadyLiked) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, error: 'post already liked' },
        HttpStatus.CONFLICT,
      );
    }
    await this._postService.incrementLikesCount(postId);
    return await this._likeRepository.save({
      post: postId,
      owner: currentUser.id,
    });
  }

  async unLikePost(postId: number, currentUser: UserEntity) {
    await this._checkPostExists(postId);
    await this._postService.decrementLikesCount(postId);
    const checkAlreadyLiked = await this._checkAlreadyLiked(
      postId,
      currentUser,
    );
    if (!checkAlreadyLiked) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, error: 'post already liked' },
        HttpStatus.CONFLICT,
      );
    }
    return await this._likeRepository.delete({
      post: postId,
      owner: currentUser.id,
    });
  }

  private async _checkAlreadyLiked(postId: number, currentUser: UserEntity) {
    const likedPost = await this._likeRepository.findOne({
      where: {
        post: postId,
        owner: currentUser.id,
      },
    });
    return likedPost;
  }

  private async _checkPostExists(postId: number) {
    const post = await this._postService.findById(postId);
    if (!post) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'post not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return post;
  }
}
