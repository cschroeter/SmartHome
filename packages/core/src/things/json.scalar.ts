import { Scalar, CustomScalar } from '@nestjs/graphql'
import { ValueNode } from 'graphql'
import { GraphQLJSON } from 'graphql-type-json'

@Scalar('JSON', () => JSON)
export class JsonScalar implements CustomScalar<any, any> {
  description = GraphQLJSON.description

  parseValue(value: any): any {
    return GraphQLJSON.parseValue(value)
  }

  serialize(value: any): any {
    return GraphQLJSON.serialize(value)
  }

  parseLiteral(ast: ValueNode, variables?: { [key: string]: any }): any {
    return GraphQLJSON.parseLiteral(ast, variables)
  }
}
