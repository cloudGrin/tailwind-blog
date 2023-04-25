import React from './react.svg'
import Git from './git.svg'
import Javascript from './javascript.svg'
import Typescript from './typescript.svg'
import Node from './nodejs.svg'
import Bash from './bash.svg'
import Liquid from './liquid.svg'
import Markdown from './markdown.svg'
import NextJS from './nextjs.svg'
import TailwindCSS from './tailwind.svg'
import Prisma from './prisma.svg'
import Umami from './umami.svg'
import Vercel from './vercel.svg'
import Railway from './railway.svg'
import Spotify from './spotify.svg'
import Docker from './docker.svg'
import Graphql from './graphql.svg'

export const DevIconsMap = {
  React,
  Git,
  Javascript,
  Typescript,
  Node,
  Bash,
  Liquid,
  Markdown,
  NextJS,
  TailwindCSS,
  Prisma,
  Umami,
  Vercel,
  Railway,
  Spotify,
  Docker,
  Graphql,
}

export default function DevIcon(props: { type: keyof typeof DevIconsMap; className?: string }) {
  const { type, className } = props
  const Icon = DevIconsMap[type]
  if (!Icon) return <div>Missing icon</div>

  const defaultClass = 'h-16 w-16 lg:h-14 lg:w-14 xl:h-24 xl:w-24'
  return <Icon className={className || defaultClass} fill="currentColor" />
}
