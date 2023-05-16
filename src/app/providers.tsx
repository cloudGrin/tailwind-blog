'use client'

import urqlClient from '@/urql'
import { Provider as UrqlProvider } from 'urql'

import { ThemeProvider } from 'next-themes'

import siteMetadata from '@/data/siteMetadata'

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <UrqlProvider value={urqlClient}>{children}</UrqlProvider>
    </ThemeProvider>
  )
}
