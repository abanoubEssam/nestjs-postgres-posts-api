import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostService } from 'src/post/post.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { FindConditions, Repository } from 'typeorm';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private _commentRepository: Repository<CommentEntity>,
    private _postService: PostService,
  ) {}

  async findAll(postId: number): Promise<CommentEntity[]> {
    return await this._commentRepository.find({
      where: { post: postId },
      relations: ['post', 'owner'],
    });
  }

  async findById(postId: number, id: number): Promise<CommentEntity> {
    const comment = await this._commentRepository.findOne({
      where: { post: postId, id },
      relations: ['post', 'owner'],
    });
    return comment;
  }

  async findOne(filter: FindConditions<CommentEntity>): Promise<CommentEntity> {
    return await this._commentRepository.findOne({
      where: filter,
      relations: ['post' , 'owner'],
    });
  }

  async createPostComment(
    postId: number,
    currentUser: UserEntity,
    createCommentDto: CreateCommentDto,
  ): Promise<CommentEntity> {
    const post = await this._postService.findById(postId);
    if (!post) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'post not found!' },
        HttpStatus.NOT_FOUND,
      );
    }
    return await this._commentRepository.save({
      post: post.id,
      owner: currentUser.id,
      ...createCommentDto,
    });
  }
}
