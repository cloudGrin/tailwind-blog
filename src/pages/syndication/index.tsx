import ListLayout from '@/layouts/ListLayout'
import { sortedBlogPost, allCoreContent } from '@/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { allSyndications } from 'contentlayer/generated'
import type { Syndication } from 'contentlayer/generated'

export const POSTS_PER_PAGE = 5

export const getStaticProps = async () => {
  const posts = sortedBlogPost(allSyndications) as Syndication[]
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      initialDisplayPosts: allCoreContent(initialDisplayPosts),
      posts: allCoreContent(posts),
      pagination,
    },
  }
}

export default function SyndicationPage({
  posts,
  initialDisplayPosts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="好文推荐"
      />
    </>
  )
}
