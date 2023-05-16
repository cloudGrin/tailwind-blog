import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { allCoreContent, sortedBlogPost } from '@/utils/contentlayer'
import type { Syndication } from 'contentlayer/generated'
import { allSyndications } from 'contentlayer/generated'
import { Metadata } from 'next'
import { POSTS_PER_PAGE } from '../../page'

export async function generateStaticParams() {
  const totalPosts = allSyndications
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }))
}

export const metadata: Metadata = {
  title: siteMetadata.author,
  description: siteMetadata.description,
}

const getPosts = (page) => {
  const posts = sortedBlogPost(allSyndications) as Syndication[]
  const pageNumber = parseInt(page as string)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    initialDisplayPosts: allCoreContent(initialDisplayPosts),
    posts: allCoreContent(posts),
    pagination,
  }
}

export default function PostPage({ params: { page } }: { params: { page: string } }) {
  const { initialDisplayPosts, posts, pagination } = getPosts(page)

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="好文推荐"
    />
  )
}
