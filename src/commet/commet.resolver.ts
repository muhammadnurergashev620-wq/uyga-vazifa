import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommetService } from './commet.service';
import { Comment } from './entities/commet.entity';
import { CreateCommetInput } from './dto/create-commet.input';
import { UpdateCommetInput } from './dto/update-commet.input';

@Resolver(() => Comment)
export class CommetResolver {
  constructor(private readonly commetService: CommetService) {}

  @Mutation(() => Comment)
  createCommet(
    @Args('createCommetInput') createCommetInput: CreateCommetInput,
  ) {
    return this.commetService.create(createCommetInput);
  }

  @Query(() => [Comment], { name: 'commets' })
  findAll() {
    return this.commetService.findAll();
  }

  @Query(() => Comment, { name: 'commet' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.commetService.findOne(id);
  }

  @Mutation(() => Comment)
  updateCommet(
    @Args('updateCommetInput') updateCommetInput: UpdateCommetInput,
  ) {
    return this.commetService.update(updateCommetInput.id, updateCommetInput);
  }

  @Mutation(() => Comment)
  removeCommet(@Args('id', { type: () => Int }) id: number) {
    return this.commetService.remove(id);
  }
}
