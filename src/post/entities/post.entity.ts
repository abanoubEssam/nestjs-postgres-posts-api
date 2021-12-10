import { CommentEntity } from 'src/comment/entities/comment.entity';
import { LikeEntity } from 'src/like/entities/like.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne((type) => UserEntity, (owner) => owner.posts, { cascade: true })
  owner: UserEntity;

  @OneToMany((type) => CommentEntity, (comment) => comment.post, {
    cascade: true,
  })
  comments: CommentEntity[];

  @OneToOne((type) => LikeEntity, (like) => like.owner, { cascade: true })
  like?: LikeEntity;

  @Column({ default: 0 })
  likesCount: number;
}
