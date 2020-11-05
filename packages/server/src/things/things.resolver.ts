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
  async setProperty(
    @Args('id', { type: () => Int }) id: number,
    @Args('property') property: string,
    @Args('value') value: string,
  ): Promise<Thing> {
    return await this.tradfriService.setProperty(id, value)
  }
}
