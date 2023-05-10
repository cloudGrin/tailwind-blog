import siteMetadata from '@/data/siteMetadata'
import SnippetLayout from '@/layouts/SnippetLayout'
import { PageSEO } from '@/components/SEO'
import { sortedBlogPost, allCoreContent } from '@/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { allSnippets } from 'contentlayer/generated'
import type { Snippet } from 'contentlayer/generated'

export const getStaticProps = async () => {
  const snippets = sortedBlogPost(allSnippets) as Snippet[]

  return {
    props: {
      snippets: allCoreContent(snippets),
    },
  }
}

export default function BlogPage({ snippets }: InferGetStaticPropsType<typeof getStaticProps>) {
  const description = 'Reuseable code snippets collected by me'

  return (
    <>
      <PageSEO
        title={`Snippets - ${siteMetadata.author} - ${siteMetadata.title}`}
        description={description}
      />
      <SnippetLayout snippets={snippets} description={description} />
    </>
  )
}
