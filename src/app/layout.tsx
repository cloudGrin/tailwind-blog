import '@/css/prism.css'
import '@/css/tailwind.css'
import Script from 'next/script'

import LayoutWrapper from '@/components/LayoutWrapper'
import siteMetadata from '@/data/siteMetadata'
import Providers from './providers'

export default function App({ children }: React.PropsWithChildren) {
  return (
    <html lang={siteMetadata.language} className="scroll-smooth">
      <head>
        <title>{siteMetadata.title}</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={siteMetadata.description} />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/SebastianAigner/twemoji-amazing/twemoji-amazing.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
        <Script
          async
          defer
          data-website-id={siteMetadata.analytics?.umamiWebsiteId}
          src="https://q.210313.cn:21132/script.js" // Replace with your umami instance
        />
      </body>
    </html>
  )
}
