import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { allCoreContent, getAllTags, type CoreContent } from '@/utils/contentlayer'
import { kebabCase } from '@/utils/kebabCase'
import { Blog, allBlogs, allSnippets, allSyndications } from 'contentlayer/generated'

interface TagsProps {
  params: { tag: string }
}

export async function generateStaticParams() {
  const tags = getAllTags([...allBlogs, ...allSnippets, ...allSyndications])

  return Object.keys(tags).map((tag) => ({
    tag,
  }))
}

export async function generateMetadata({ params: { tag } }: TagsProps) {
  return {
    title: `${tag} - ${siteMetadata.title}`,
    description: `${tag} tags - ${siteMetadata.author}`,
  }
}

const getTags = (tag: string) => {
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

  return { posts: filteredPosts }
}

export default function Tag({ params: { tag } }: TagsProps) {
  const { posts } = getTags(tag)
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return <ListLayout posts={posts as CoreContent<Blog>[]} title={title} />
}
