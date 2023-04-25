import { generateRSS } from 'pliny/utils/generate-rss.js'
import siteMetadata from '../src/data/siteMetadata.js'
import { allBlogs, allSnippets } from '../.contentlayer/generated/index.mjs'

const rss = () => {
  generateRSS(siteMetadata, [...allBlogs, ...allSnippets])
  console.log('RSS feed generated...')
}
export default rss
