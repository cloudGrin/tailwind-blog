import PageTitle from '@/components/PageTitle'

import Mdx from '@/components/mdx-components'
import { coreContent, sortedBlogPost } from '@/utils/contentlayer'
import type { Snippet } from 'contentlayer/generated'
import { allSnippets } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

const DEFAULT_LAYOUT = 'PostSimple'

interface PageProps {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams() {
  return allSnippets.map((p) => ({ slug: p.slug.split('/') }))
}

const getSnippets = (slug) => {
  const slugUrl = slug.join('/')
  const sortedPosts = sortedBlogPost(allSnippets) as Snippet[]
  const postIndex = sortedPosts.findIndex((p) => p.slug === slugUrl)
  if (postIndex < 0) {
    return {
      post: null,
    }
  }
  const prevContent = sortedPosts[postIndex + 1] || null
  const prev = prevContent ? coreContent(prevContent) : null
  const nextContent = sortedPosts[postIndex - 1] || null
  const next = nextContent ? coreContent(nextContent) : null
  const post = sortedPosts.find((p) => p.slug === slugUrl)!

  return {
    post,
    prev,
    next,
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const { post } = getSnippets(params.slug)

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

export default function BlogPostPage({ params: { slug } }: PageProps) {
  const { post, prev, next } = getSnippets(slug)

  if (!post) {
    notFound()
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
        <Mdx
          code={post.body.code}
          layout={post.layout || DEFAULT_LAYOUT}
          content={post}
          prev={prev}
          next={next}
        />
      )}
    </>
  )
}
