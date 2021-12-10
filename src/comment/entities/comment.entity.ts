import { PostEntity } from 'src/post/entities/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne((type) => PostEntity, (post) => post.comments)
  post: number | PostEntity;

  @OneToOne((type) => UserEntity, (owner) => owner.comment)
  @JoinColumn({ referencedColumnName: "id" })
  owner: number | UserEntity;
}
