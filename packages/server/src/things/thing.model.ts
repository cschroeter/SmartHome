import { Field, Int, ObjectType, InterfaceType, registerEnumType } from '@nestjs/graphql'

// https://iot.mozilla.org/wot/#thing-resource
@ObjectType()
export class Thing {
  @Field(() => Int)
  id: number

  @Field()
  title: string

  @Field()
  description: string

  @Field((type) => [Property])
  properties: Property[]
}

@InterfaceType({
  resolveType(property: Property) {
    if (property.type === PropertyType.Brightness) {
      return Brightness
    }
    if (property.type === PropertyType.OnOff) {
      return OnOff
    }
  },
})
export abstract class Property {
  @Field((type) => PropertyType)
  type: PropertyType

  @Field()
  title: string
}

export enum PropertyType {
  Brightness,
  OnOff,
}

registerEnumType(PropertyType, {
  name: 'PropertyType',
})

@ObjectType({
  implements: [Property],
})
export class Brightness implements Property {
  title: string
  type: PropertyType

  @Field()
  min: number

  @Field()
  max: number

  // @Field()
  // value: number
}

@ObjectType({
  implements: [Property],
})
export class OnOff implements Property {
  title: string
  type: PropertyType

  @Field()
  value: boolean
}
