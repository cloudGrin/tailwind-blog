import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { sortedBlogPost, allCoreContent } from '@/utils/contentlayer'
import { allSyndications } from 'contentlayer/generated'
import type { Syndication } from 'contentlayer/generated'
import type { Metadata } from 'next'

export const POSTS_PER_PAGE = 5

export const metadata: Metadata = {
  title: `Syndications - ${siteMetadata.author}`,
  description: siteMetadata.description,
}

const getPosts = () => {
  const posts = sortedBlogPost(allSyndications) as Syndication[]
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    initialDisplayPosts: allCoreContent(initialDisplayPosts),
    posts: allCoreContent(posts),
    pagination,
  }
}

export default async function BlogPage() {
  const { initialDisplayPosts, posts, pagination } = getPosts()
  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="好文推荐"
    />
  )
}
