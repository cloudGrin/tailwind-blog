import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import config from '@/server/graphql'

const server = new ApolloServer(config)

export default startServerAndCreateNextHandler(server)
