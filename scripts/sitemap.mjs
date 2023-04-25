import { generateSitemap } from 'pliny/utils/generate-sitemap.js'
import siteMetadata from '../src/data/siteMetadata.js'
import { allBlogs, allSnippets } from '../.contentlayer/generated/index.mjs'

const sitemap = () => {
  generateSitemap(siteMetadata.siteUrl, [...allBlogs, ...allSnippets])
  console.log('Sitemap generated...')
}
export default sitemap
