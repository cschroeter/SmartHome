import { Field, Int, ObjectType } from '@nestjs/graphql'

// https://iot.mozilla.org/wot/#thing-resource
@ObjectType()
export class Thing {
  @Field(() => Int)
  id: number

  @Field()
  title: string

  @Field()
  description: string

  properties: any
  actions: any
  events: any

  // @Field({ nullable: true })
  // on?: boolean

  // @Field({ nullable: true })
  // brightness: number
}

@ObjectType()
export class Property {
  @Field()
  title: string
}
