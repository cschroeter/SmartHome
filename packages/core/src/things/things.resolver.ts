import { Resolver, Query, Mutation, Args, Int, Field, InputType } from '@nestjs/graphql'
import { Property, Thing } from './thing.model'
import { TradfriService } from './tradfri.service'

@InputType()
export class SetPropertyInput {
  @Field(() => Int)
  id: number

  @Field(() => Property)
  property: Property

  @Field(() => JSON)
  value: any
}

@Resolver(() => Thing)
export class ThingsResolver {
  constructor(private tradfriService: TradfriService) {}

  @Query(() => [Thing])
  things(): Thing[] {
    return this.tradfriService.getThings()
  }

  @Mutation(() => Thing)
  async setProperty(@Args('setPropertyInput') setPropertyInput: SetPropertyInput): Promise<Thing> {
    return await this.tradfriService.setProperty(setPropertyInput)
  }
}
