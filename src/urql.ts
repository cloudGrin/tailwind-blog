import { Client, cacheExchange, fetchExchange } from 'urql'

const client = new Client({
  url: '/api/graphql',
  exchanges: [cacheExchange, fetchExchange],
})

export default client
