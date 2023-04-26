import { prisma } from '@/server/db'
import { Resolvers } from '@/gql/resolvers-types'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const typeDefs = readFileSync(join(process.cwd(), 'public', 'schema.graphql'), {
  encoding: 'utf-8',
})

const resolvers: Resolvers = {
  Query: {
    async addViewCount(parent, { postName }) {
      const result = await prisma.blogPostViews.findUnique({
        where: { postName },
      })

      if (!result) {
        throw new Error(`Blog post with name "${postName}" not found`)
      }

      return result
    },
  },

  Mutation: {
    async views(parent, { postName }) {
      const blogPostViews = await prisma.blogPostViews.findUnique({
        where: { postName },
      })

      let views = 1
      if (blogPostViews) {
        views = blogPostViews.views + 1
        await prisma.blogPostViews.update({
          where: { id: blogPostViews.id },
          data: { views: views },
        })
      } else {
        await prisma.blogPostViews.create({ data: { postName: postName, views: views } })
      }

      return views
    },
  },

  BlogPostViews: {
    async postName(blogPostViews) {
      return blogPostViews.postName
    },

    async views(blogPostViews) {
      return blogPostViews.views
    },
  },
}

const viewConfig = {
  typeDefs,
  resolvers,
}

export default viewConfig
