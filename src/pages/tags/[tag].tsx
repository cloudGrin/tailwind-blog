import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { kebabCase } from '@/utils/kebabCase'
import { getAllTags, allCoreContent, type CoreContent } from '@/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { Blog, allBlogs, allSnippets, allSyndications } from 'contentlayer/generated'

export async function getStaticPaths() {
  const tags = await getAllTags([...allBlogs, ...allSnippets, ...allSyndications])

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const tag = context.params.tag as string
  const filteredPosts = allCoreContent([
    ...allBlogs.filter(
      (post) => post.draft !== true && post.tags?.map((t) => kebabCase(t)).includes(tag)
    ),
    ...allSnippets.filter(
      (post) => post.draft !== true && post.tags?.map((t) => kebabCase(t)).includes(tag)
    ),
    ...allSyndications.filter(
      (post) => post.draft !== true && post.tags?.map((t) => kebabCase(t)).includes(tag)
    ),
  ])

  return { props: { posts: filteredPosts, tag } }
}

export default function Tag({ posts, tag }: InferGetStaticPropsType<typeof getStaticProps>) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.title}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts as CoreContent<Blog>[]} title={title} />
    </>
  )
}
