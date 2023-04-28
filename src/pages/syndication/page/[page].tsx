import ListLayout from '@/layouts/ListLayout'
import { allCoreContent, sortedBlogPost } from 'pliny/utils/contentlayer'
import { POSTS_PER_PAGE } from '../index'
import { InferGetStaticPropsType } from 'next'
import { allSyndications } from 'contentlayer/generated'
import type { Syndication } from 'contentlayer/generated'

export const getStaticPaths = async () => {
  const totalPosts = allSyndications
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const {
    params: { page },
  } = context
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
    props: {
      initialDisplayPosts: allCoreContent(initialDisplayPosts),
      posts: allCoreContent(posts),
      pagination,
    },
  }
}

export default function PostPage({
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
