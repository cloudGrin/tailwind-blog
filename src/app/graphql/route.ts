import { NextRequest } from 'next/server'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import config from '@/server/graphql'

const server = new ApolloServer(config)

const handler = startServerAndCreateNextHandler<NextRequest>(server)

export async function GET(request) {
  return handler(request)
}

export async function POST(request) {
  return handler(request)
}
