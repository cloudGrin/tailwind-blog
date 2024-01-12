import ListLayout from '@/layouts/ListLayout'
import { sortedBlogPost, allCoreContent } from '@/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import type { Blog } from 'contentlayer/generated'
import { genPageMetadata } from '@/app/seo'

const POSTS_PER_PAGE = 6

export const metadata = genPageMetadata({ title: 'Blog' })

const getPosts = () => {
  const posts = sortedBlogPost(allBlogs) as Blog[]
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
      title="All Posts"
    />
  )
}
