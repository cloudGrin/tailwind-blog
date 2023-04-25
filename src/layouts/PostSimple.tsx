import { useState, ReactNode } from 'react'
import { Comments } from 'pliny/comments'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import BlogTags from '@/components/BlogTags'
import { BlogMeta } from '@/components/BlogMeta'

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/master/data/${path}`

export default function PostSimple({ content, authorDetails, children }: LayoutProps) {
  const [loadComments, setLoadComments] = useState(true)
  const { filePath, path, slug, date, title, tags, readingTime } = content

  return (
    <SectionContainer>
      <BlogSEO url={`${siteMetadata.siteUrl}/${path}`} authorDetails={authorDetails} {...content} />
      <ScrollTopAndComment />
      <article>
        <div>
          <header className="py-6 xl:pb-16 xl:pt-16">
            <div className="space-y-4">
              <BlogTags tags={tags} />
              <PageTitle>{title}</PageTitle>
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <BlogMeta date={date} path={path} readingTime={readingTime} />
                </div>
              </dl>
            </div>
          </header>
          <div className="" style={{ gridTemplateRows: 'auto 1fr' }}>
            <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="pb-8 prose prose-base max-w-none dark:prose-dark md:prose-lg">
                {children}
              </div>
              <div className="pt-6 pb-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <Link href={editUrl(filePath)}>View on GitHub</Link>
                </div>
                {siteMetadata.comments && (
                  <div className="pt-6 text-center text-gray-700 dark:text-gray-300" id="comment">
                    {!loadComments && (
                      <button onClick={() => setLoadComments(true)}>Load Comments</button>
                    )}
                    {loadComments && (
                      <Comments commentsConfig={siteMetadata.comments} slug={slug} />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
