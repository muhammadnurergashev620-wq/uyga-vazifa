import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';
import { CreatePostInput } from './create-post.input';

@InputType()
export class UpdatePostInput extends PartialType(
  OmitType(CreatePostInput, ['userId'] as const),
) {
  @Field(() => Int)
  id: number;
}
