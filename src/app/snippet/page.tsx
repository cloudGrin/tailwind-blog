import SnippetLayout from '@/layouts/SnippetLayout'
import { allCoreContent, sortedBlogPost } from '@/utils/contentlayer'
import type { Snippet } from 'contentlayer/generated'
import { allSnippets } from 'contentlayer/generated'
import { genPageMetadata } from '@/app/seo'

const description = 'Reuseable code snippets collected by me'

export const metadata = genPageMetadata({ title: 'Snippets', description })

const getSnippets = () => {
  const snippets = sortedBlogPost(allSnippets) as Snippet[]

  return allCoreContent(snippets)
}

export default function BlogPage() {
  const snippets = getSnippets()
  return <SnippetLayout snippets={snippets} description={description} />
}
