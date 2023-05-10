import { useState, ReactNode } from 'react'
import GiscusComponent from '@/components/GiscusComponent'
import { CoreContent } from '@/utils/contentlayer'
import type { Blog, Authors, Syndication, Snippet } from 'contentlayer/generated'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import BlogTags from '@/components/BlogTags'
import { BlogMeta } from '@/components/BlogMeta'

interface LayoutProps {
  content: CoreContent<Blog | Syndication | Snippet>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/master/src/data/${path}`

export default function PostSimple(props: LayoutProps) {
  const { content, authorDetails, children } = props
  const [loadComments, setLoadComments] = useState(true)
  const { filePath, path, slug, date, title, tags, readingTime, type } = content
  // @ts-ignore
  const { isEdit: isSyndicationEdit } = content

  return (
    <SectionContainer>
      {type !== 'Syndication' && (
        <BlogSEO
          url={`${siteMetadata.siteUrl}/${path}`}
          authorDetails={authorDetails}
          {...content}
        />
      )}
      <ScrollTopAndComment />
      <article>
        <div>
          <header className="py-5 xl:pb-11 xl:pt-11">
            <div className="space-y-4">
              <BlogTags tags={tags!} />
              <PageTitle>{title}</PageTitle>
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <BlogMeta date={date} path={path} readingTime={readingTime} />
                </div>
              </dl>
              {type === 'Syndication' && isSyndicationEdit && (
                <h5 className="text-lg tracking-tight text-gray-600 dark:text-gray-200 sm:text-xl md:text-2xl">
                  经编辑后转载
                </h5>
              )}
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
                    {loadComments && <GiscusComponent {...siteMetadata.comments.giscusConfig} />}
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
