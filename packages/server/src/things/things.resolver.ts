import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { PropertyType, Thing } from './thing.model'
import { TradfriService } from './tradfri.service'

@Resolver(() => Thing)
export class ThingsResolver {
  constructor(private tradfriService: TradfriService) {}

  @Query(() => [Thing])
  things(): Thing[] {
    const thing: Thing = {
      id: 65539,
      title: 'Tradfri Light Bulb',
      description: 'you ikea lamp',
      properties: [
        // @ts-ignore
        { type: PropertyType.OnOff, title: 'Light', value: true },
        // @ts-ignore
        { type: PropertyType.Brightness, title: 'Brightness', max: 254, min: 0 },
      ],
    }
    return [thing]
    // return this.tradfriService.getThings()
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
