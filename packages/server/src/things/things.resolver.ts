import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { Thing } from './thing.model'
import { TradfriService } from './tradfri.service'

@Resolver(() => Thing)
export class ThingsResolver {
  constructor(private tradfriService: TradfriService) {}

  @Query(() => [Thing])
  things(): Thing[] {
    return this.tradfriService.getThings()
  }

  @Mutation((returns) => Thing)
  async toggleLight(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.tradfriService.toggle(id)
  }

  @Mutation((returns) => Thing)
  async setBrightness(
    @Args('id', { type: () => Int }) id: number,
    @Args('brightness', { type: () => Int }) brightness: number,
  ) {
    return this.tradfriService.setBrightness(id, brightness)
  }
}
