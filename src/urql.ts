import { Client, cacheExchange, fetchExchange } from 'urql'

const client = new Client({
  url: '/graphql',
  exchanges: [cacheExchange, fetchExchange],
})

export default client
