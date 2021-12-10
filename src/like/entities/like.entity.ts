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

@Entity({name: "likes"})
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => PostEntity, (post) => post.comments)
  @JoinColumn({ referencedColumnName: "id" })
  post: number | PostEntity;

  @OneToOne((type) => UserEntity, (owner) => owner.comment)
  @JoinColumn({ referencedColumnName: "id" })
  owner: number | UserEntity;
}
