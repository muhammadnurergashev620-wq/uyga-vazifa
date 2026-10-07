import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';
import { CreateCommetInput } from './create-commet.input';

@InputType()
export class UpdateCommetInput extends PartialType(
  OmitType(CreateCommetInput, ['userId', 'postId'] as const),
) {
  @Field(() => Int)
  id: number;
}
