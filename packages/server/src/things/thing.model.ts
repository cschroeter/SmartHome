import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Thing {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field({ nullable: true })
  on?: boolean

  @Field({ nullable: true })
  brightness: number
}
