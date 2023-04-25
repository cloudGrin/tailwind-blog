import { writeFileSync } from 'fs'
import { allCoreContent } from 'pliny/utils/contentlayer.js'
import { allBlogs, allSnippets } from '../.contentlayer/generated/index.mjs'
import siteMetadata from '../src/data/siteMetadata.js'

const search = () => {
  if (siteMetadata?.search?.kbarConfig?.searchDocumentsPath) {
    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(allCoreContent([...allBlogs, ...allSnippets]))
    )
    console.log('Local search index generated...')
  }
}
export default search
