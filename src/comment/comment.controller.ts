import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { CommentService } from './comment.service';
import { PaginatedResponse } from 'src/common/utils/paginated-response';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('/posts/:postId/comments')
export class CommentController {
  constructor(private _commentSerivce: CommentService) {}

  @Get()
  async findAllUsers(
    @Param('postId') postId: number,
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<CommentEntity>> {
    return this._commentSerivce.findAll(postId, paginationDto);
  }

  @Post()
  async createPost(
    @Param('postId') postId: number,
    @Body() postDto: CreateCommentDto,
    @CurrentUser() user: UserEntity,
  ): Promise<CommentEntity> {
    return this._commentSerivce.createPostComment(postId, user, postDto);
  }

  @Get('/:commentId')
  async findUser(
    @Param('postId') postId: number,
    @Param('commentId') commentId: number,
  ) {
    return this._commentSerivce.findById(postId, commentId);
  }
}
