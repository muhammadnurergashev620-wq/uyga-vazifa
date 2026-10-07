import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Post } from '../../post/entities/post.entity';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  postId: number;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Post, { nullable: true })
  post?: Post;
}
