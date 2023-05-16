import Mdx from '@/components/mdx-components'
import PageTitle from '@/components/PageTitle'
import { allSyndications } from 'contentlayer/generated'
import type { Syndication } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Script from 'next/script'
import siteMetadata from '@/data/siteMetadata'

const DEFAULT_LAYOUT = 'PostSimple'

interface PageProps {
  params: {
    slug: string[]
  }
}

async function getPageFromParams(params: PageProps['params']) {
  const slug = params?.slug?.join('/')
  const page = allSyndications.find((page) => page.slug === slug)

  if (!page) {
    null
  }

  return page
}

// 生成符合schema.org结构化数据的函数
function generateSchemaObjStr(post: Syndication) {
  const { title, summary, date, lastmod, path } = post

  const publishedAt = new Date(date).toISOString()
  const modifiedAt = new Date(lastmod || date).toISOString()

  const authorList = {
    '@type': 'Person',
    name: siteMetadata.author,
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteMetadata.siteUrl}/${path}`,
    },
    headline: title,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorList,
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.author,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      },
    },
    description: summary,
  }
  return JSON.stringify(structuredData, null, 2)
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params)

  if (!page) {
    return {}
  }

  const { title, summary } = page

  return {
    title: title,
    description: summary,
  }
}

export async function generateStaticParams(): Promise<PageProps['params'][]> {
  return allSyndications.map((page) => ({
    slug: page.slug.split('/'),
  }))
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPageFromParams(params)

  if (!post) {
    notFound()
  }

  const structuredData = generateSchemaObjStr(post)

  return (
    <>
      {'draft' in post && post.draft === true ? (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      ) : (
        <>
          <Mdx code={post.body.code} layout={post.layout || DEFAULT_LAYOUT} content={post} />
          <Script
            id="schema-org"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: structuredData,
            }}
          />
        </>
      )}
    </>
  )
}
