import '@/css/prism.css'
import '@/css/tailwind.css'
import 'katex/dist/katex.css'
// import '@/css/docsearch.css' // Uncomment if using algolia docsearch
// import '@docsearch/css' // Uncomment if using algolia docsearch
import urqlClient from '@/urql'
import Script from 'next/script'
import { Provider as UrqlProvider } from 'urql'

import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import LayoutWrapper from '@/components/LayoutWrapper'
import siteMetadata from '@/data/siteMetadata'
import { SearchProvider } from 'pliny/search'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Script
        async
        defer
        data-website-id={siteMetadata.analytics.umamiWebsiteId}
        src="https://q.210313.cn:21132/script.js" // Replace with your umami instance
      />
      <UrqlProvider value={urqlClient}>
        <LayoutWrapper>
          <SearchProvider searchConfig={siteMetadata.search}>
            <Component {...pageProps} />
          </SearchProvider>
        </LayoutWrapper>
      </UrqlProvider>
    </ThemeProvider>
  )
}
