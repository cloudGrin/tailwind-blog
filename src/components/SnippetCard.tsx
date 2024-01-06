import { Snippet } from 'contentlayer/generated'
import DevIcon from './dev-icons'
import Link from './Link'
import { CoreContent } from '@/utils/contentlayer'

export function SnippetCard({ snippet }: { snippet: CoreContent<Snippet> }) {
  const { devType, heading, summary, title, slug } = snippet

  return (
    <Link href={`/snippet/${slug}`} title={title}>
      <div className="umami--click--view-snippet mb-4 flex cursor-pointer rounded border border-gray-300 hover:border-gray-500 dark:border-gray-600 dark:hover:border-gray-400 lg:mb-0">
        <div className="p-3 lg:p-4">
          <DevIcon type={devType} />
        </div>
        <div className="overflow-hidden p-3 md:p-4 lg:p-4">
          <h3 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-bold leading-8 tracking-tight lg:text-2xl">
            {heading}
          </h3>
          <p className="text-md mt-2 text-gray-700 dark:text-gray-400 lg:text-base">{summary}</p>
        </div>
      </div>
    </Link>
  )
}
