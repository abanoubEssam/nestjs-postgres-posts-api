import { CommentEntity } from 'src/comment/entities/comment.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne((type) => UserEntity, (owner) => owner.posts)
  owner: UserEntity;

  @OneToMany((type) => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
