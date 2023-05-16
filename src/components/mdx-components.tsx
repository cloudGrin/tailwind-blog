import 'server-only'

import TOCInline from '@/components/ui/TOCInline'

import Pre from '@/components/ui/Pre'

import Wrapper from '@/components/Wrapper'

import Image from 'next/image'
import CustomLink from './Link'
import { getMDXComponent } from 'next-contentlayer/hooks'

const components = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
}

export default function Mdx({ code, ...rest }: any) {
  const Content = getMDXComponent(code)

  return <Content {...rest} components={components} />
}
