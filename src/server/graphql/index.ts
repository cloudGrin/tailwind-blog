import { type ApolloServerOptions } from '@apollo/server'

import view from './model/view'

const typeDefs = `#graphql
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  ${view.typeDefs}
`

const resolvers = {
  Query: {
    ...view.resolvers.Query,
  },
  Mutation: {
    ...view.resolvers.Mutation,
  },
}

const config: ApolloServerOptions<unknown> = { typeDefs, resolvers }

export default config
