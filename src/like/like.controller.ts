import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { LikeService } from './like.service';

@ApiTags('Likes')
@ApiBearerAuth()
@Controller('/posts/:postId/')
export class LikeController {
  constructor(private _likeSerivce: LikeService) {}

  @Post('/like')
  async likePost(
    @CurrentUser() currentUser: UserEntity,
    @Param('postId') postId: number,
  ) {
    return await this._likeSerivce.likePost(postId, currentUser);
  }

  @Post('/unlike')
  async unlikePost(
    @CurrentUser() currentUser: UserEntity,
    @Param('postId') postId: number,
  ) {
    return await this._likeSerivce.unLikePost(postId, currentUser);
  }

  @Get('/likes')
  async findPostLikes(
    @Param('postId') postId: number,
    @Query() paginationDto: PaginationDto,
  ) {
    return await this._likeSerivce.findPostLikes(postId, paginationDto);
  }
}
