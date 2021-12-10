import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async likePost(postId: number, currentUser: UserEntity) {
    const post = await this._postService.findById(postId);
    if (!post) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'post not found' },
        HttpStatus.NOT_FOUND,
      );
    }
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
    const post = await this._postService.findById(postId);
    if (!post) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'post not found' },
        HttpStatus.NOT_FOUND,
      );
    }
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
}
