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

export enum Property {
  Brightness,
  OnOff,
}

registerEnumType(Property, {
  name: 'Property',
})

@ObjectType()
export class Properties {
  @Field(() => NumberValue, { nullable: true })
  brightness?: NumberValue

  @Field(() => BooleanValue, { nullable: true })
  on?: BooleanValue
}

export enum Capability {
  Light,
  OnOffSwitch,
}

registerEnumType(Capability, {
  name: 'Capability',
})

@ObjectType()
export class Thing {
  @Field(() => Int)
  id: number

  @Field()
  title: string

  @Field()
  description: string

  @Field(() => Properties)
  properties: Properties

  @Field(() => [Capability])
  capabilities: Capability[]
}
