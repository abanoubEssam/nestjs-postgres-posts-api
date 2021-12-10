import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostEntity } from './entities/post.entity';
import { PostService } from './post.service';

@ApiTags('Posts')
@ApiBearerAuth()
@Controller('posts')
export class PostController {
  constructor(private _postSerivce: PostService) {}

  @Get()
  async findAllUsers(): Promise<PostEntity[]> {
    return this._postSerivce.findAll();
  }

  @Post()
  async createPost(
    @Body() postDto: CreatePostDto,
    @CurrentUser() user: UserEntity,
  ): Promise<PostEntity> {
    return this._postSerivce.createPost(user, postDto);
  }

  @Get('/:postId')
  async findUser(@Param('postId') postId: number) {
    return this._postSerivce.findById(postId);
  }
}
