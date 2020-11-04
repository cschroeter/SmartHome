import { Resolver, Query } from '@nestjs/graphql'
import { Thing } from './thing.model'

@Resolver(() => Thing)
export class ThingsResolver {
  @Query(() => [Thing])
  things(): Promise<Thing[]> {
    return Promise.resolve([{ id: 123 }])
  }
}
