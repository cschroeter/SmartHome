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
  async toggleLight(@Args({ name: 'instanceId', type: () => Int }) instanceId: number) {
    return this.tradfriService.toggle(instanceId)
  }
}
