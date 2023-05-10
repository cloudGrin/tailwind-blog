import { useMDXComponent } from 'next-contentlayer/hooks'

import { TOCInline } from '@/components/ui/TOCInline'
import { Pre } from '@/components/ui/Pre'

import Image from './Image'
import CustomLink from './Link'

import React, { lazy, Suspense } from 'react'
export const Wrapper = ({ layout, content, ...rest }) => {
  const Layout = lazy(() =>
    import(`../layouts/${layout}`).then((module) => ({ default: module.default }))
  )
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout content={content} {...rest} />
    </Suspense>
  )
}

const components = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
}

export default function Mdx({ code, ...rest }: any) {
  const Component = useMDXComponent(code)

  return <Component {...rest} components={components} />
}
