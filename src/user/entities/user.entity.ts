import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../../post/entities/post.entity';
import { Comment } from '../../commet/entities/commet.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  fullName: string;

  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];
}
