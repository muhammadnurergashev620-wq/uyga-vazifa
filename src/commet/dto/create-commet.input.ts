import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommetInput {
  @Field()
  text: string;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  postId: number;
}
