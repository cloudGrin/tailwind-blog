export interface CoreConfig {
  title: string
  author: string
  headerTitle: string
  description: string
  language: string
  /** light and dark */
  theme: 'system' | 'dark' | 'light'
  siteUrl: string
  siteRepo: string
  siteLogo: string
  image: string
  socialBanner: string
  email: string
  github: string
  twitter?: string
  facebook?: string
  youtube?: string
  linkedin?: string
  locale: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Config = Record<string, any> & CoreConfig
