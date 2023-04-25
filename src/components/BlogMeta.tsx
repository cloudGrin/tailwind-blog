import { Twemoji } from './Twemoji'
import { ViewCounter } from './ViewCounter'
import { type Blog } from 'contentlayer/generated'
import { formatDate } from 'pliny/utils/formatDate'

export function BlogMeta({
  date,
  path,
  readingTime,
}: {
  date: Blog['date']
  path: Blog['path']
  readingTime: Blog['readingTime']
}) {
  return (
    <dd className="flex flex-wrap text-sm font-medium leading-6 text-gray-500 dark:text-gray-400 md:text-base">
      <time dateTime={date} className="flex items-center justify-center">
        <Twemoji emoji="calendar" size="" />
        <span className="ml-1.5 md:ml-2">{formatDate(date)}</span>
      </time>
      <span className="mx-2">{` • `}</span>
      <div className="flex items-center">
        <Twemoji emoji="hourglass-not-done" size="" />
        <span className="ml-1.5 md:ml-2">{readingTime.text.replace('min', 'mins')}</span>
      </div>
      <span className="mx-2">{` • `}</span>
      <div className="flex items-center">
        <Twemoji emoji="eye" size="" />
        <ViewCounter className="ml-1.5 md:ml-2" path={path} />
      </div>
    </dd>
  )
}
