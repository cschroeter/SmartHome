import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Thing {
  @Field(() => Int)
  id: number
}
