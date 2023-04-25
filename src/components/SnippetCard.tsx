import { Snippet } from 'contentlayer/generated'
import DevIcon from './dev-icons'
import Link from './Link'
import { CoreContent } from 'pliny/utils/contentlayer'

export function SnippetCard({ snippet }: { snippet: CoreContent<Snippet> }) {
  const { devType, heading, summary, title, slug } = snippet

  return (
    <Link href={`/snippet/${slug}`} title={title}>
      <div className="flex mb-4 border border-gray-300 rounded cursor-pointer umami--click--view-snippet hover:border-gray-500 dark:border-gray-600 dark:hover:border-gray-400 lg:mb-0">
        <div className="p-3 lg:p-4">
          <DevIcon type={devType} />
        </div>
        <div className="p-3 overflow-hidden md:p-4 lg:p-4">
          <h3 className="overflow-hidden text-lg font-bold leading-8 tracking-tight overflow-ellipsis whitespace-nowrap lg:text-2xl">
            {heading}
          </h3>
          <p className="mt-2 text-gray-700 text-md dark:text-gray-400 lg:text-base">{summary}</p>
        </div>
      </div>
    </Link>
  )
}
