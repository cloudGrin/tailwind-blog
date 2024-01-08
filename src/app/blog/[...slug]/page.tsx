import Mdx from '@/components/mdx-components'
import PageTitle from '@/components/PageTitle'
import { allBlogs } from 'contentlayer/generated'
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
  const page = allBlogs.find((page) => page.slug === slug)

  if (!page) {
    null
  }

  return page
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const post = await getPageFromParams(params)
  if (!post) {
    return
  }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export async function generateStaticParams(): Promise<PageProps['params'][]> {
  return allBlogs.map((page) => ({
    slug: page.slug.split('/'),
  }))
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPageFromParams(params)

  if (!post) {
    notFound()
  }

  const jsonLd = post.structuredData
  jsonLd['author'] = {
    '@type': 'Person',
    name: siteMetadata.author,
  }

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
              __html: jsonLd,
            }}
          />
        </>
      )}
    </>
  )
}
