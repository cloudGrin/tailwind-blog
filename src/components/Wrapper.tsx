import PostSimple from '@/layouts/PostSimple'

export default function Wrapper({ content, children, ...rest }) {
  return (
    <PostSimple content={content} {...rest}>
      {children}
    </PostSimple>
  )
}
