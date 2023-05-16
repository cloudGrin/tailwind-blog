'use client'

import { useEffect } from 'react'
import { useMutation } from 'urql'
import { type Blog } from 'contentlayer/generated'
import { graphql } from '@/gql'

const mutation = graphql(`
  mutation Mutation($postName: String!) {
    views(postName: $postName)
  }
`)

export default function ViewCounter({
  path,
  className,
}: {
  path: Blog['path']
  className: string
}) {
  const [result, executeMutation] = useMutation(mutation)

  const views = Number(result.data?.views)

  useEffect(() => {
    executeMutation({ postName: path })
  }, [executeMutation, path])

  return <span className={className}>{`${views > 0 ? views.toLocaleString() : '–––'} views`}</span>
}
