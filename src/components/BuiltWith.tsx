import siteMetadata from '@/data/siteMetadata'
import DevIcon from './dev-icons'
import Link from './Link'

export function BuiltWith() {
  return (
    <div className="flex items-center space-x-1 text-sm md:text-base">
      <span className="mr-1 text-gray-500 dark:text-gray-400">Built with</span>
      <div className="flex space-x-1.5">
        <Link href="https://nextjs.org?ref=blog.grin.cool">
          <DevIcon type="NextJS" className="w-5 h-5" />
        </Link>
        <Link href="https://tailwindcss.com?ref=blog.grin.cool">
          <DevIcon type="TailwindCSS" className="w-5 h-5" />
        </Link>
        <Link href="https://www.prisma.io?ref=blog.grin.cool">
          <DevIcon type="Prisma" className="w-5 h-5" />
        </Link>
        <Link href="https://www.typescriptlang.org?ref=blog.grin.cool">
          <DevIcon type="Typescript" className="w-5 h-5" />
        </Link>
        <Link href="https://graphql.org" className="pl-px">
          <DevIcon type="Graphql" className="w-5 h-5" />
        </Link>
        <Link href="https://umami.is?ref=blog.grin.cool" className="pl-px">
          <DevIcon type="Umami" className="w-5 h-5" />
        </Link>
      </div>
      <span className="px-1 text-gray-400 dark:text-gray-500">-</span>
      <Link
        href={siteMetadata.siteRepo}
        className="text-gray-500 underline underline-offset-4 dark:text-gray-400"
      >
        <span className="umami--click--view-source">View source</span>
      </Link>
    </div>
  )
}
