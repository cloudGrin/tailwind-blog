import Link from 'next/link'
import { kebabCase } from '@/utils/kebabCase'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      <span className="umami--click--tag">#{text.split(' ').join('-')}</span>
    </Link>
  )
}

export default Tag
