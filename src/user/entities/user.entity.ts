import { CommentEntity } from 'src/comment/entities/comment.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @OneToMany((type) => PostEntity, (post) => post.owner)
  posts?: PostEntity[];

  @OneToOne((type) => CommentEntity, (comment) => comment.owner)
  comment?: CommentEntity;
}
