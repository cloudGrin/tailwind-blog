import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { CoreContent } from '@/utils/contentlayer'
import { formatDate } from '@/utils/formatDate'
import type { Blog, Snippet, Syndication } from 'contentlayer/generated'

export default function BlogListItem({
  post,
  pathname,
}: {
  post: CoreContent<Blog | Syndication | Snippet>
  pathname?: string
}) {
  const { path, date, title, summary, tags, type } = post
  return (
    <li key={path} className="py-4">
      <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
          </dd>
        </dl>
        <div className="space-y-3 xl:col-span-3">
          <div>
            <h3 className="text-2xl font-bold leading-8 tracking-tight">
              <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                {`${
                  type === 'Syndication' && pathname && pathname.includes('/tags') ? '【转载】' : ''
                }${title}`}
              </Link>
            </h3>
            <div className="flex flex-wrap">
              {tags?.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          </div>
          <div className="prose text-gray-500 max-w-none dark:text-gray-400">{summary}</div>
        </div>
      </article>
    </li>
  )
}
