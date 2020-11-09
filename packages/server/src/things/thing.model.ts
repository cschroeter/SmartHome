import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'

// https://iot.mozilla.org/wot/#thing-resource

@ObjectType()
export class StringValue {
  @Field()
  type: string

  @Field()
  value: string
}

@ObjectType()
export class NumberValue {
  @Field()
  type: string

  @Field()
  min: number

  @Field()
  max: number

  @Field()
  value: number
}

@ObjectType()
export class BooleanValue {
  @Field()
  type: string

  @Field()
  value: boolean
}

@ObjectType()
export class Properties {
  @Field((type) => NumberValue, { nullable: true })
  brightness?: NumberValue

  @Field((type) => BooleanValue, { nullable: true })
  on?: BooleanValue
}

export enum Capabilities {
  Light,
  OnOffSwitch,
}

registerEnumType(Capabilities, {
  name: 'Capabilities',
})

@ObjectType()
export class Thing {
  @Field(() => Int)
  id: number

  @Field()
  title: string

  @Field()
  description: string

  @Field((type) => Properties)
  properties: Properties

  @Field((type) => [Capabilities])
  capabilities: Capabilities[]

  @Field({ name: '@type' })
  '_type': string
}
