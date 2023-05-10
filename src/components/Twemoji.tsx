import { kebabCase } from '@/utils/kebabCase'

interface TwemojiProps {
  emoji: string
  size?: string
  className?: string
}

export default function Twemoji({ emoji, size = 'twa-lg', className }: TwemojiProps) {
  const cls = `inline-block twa ${size} twa-${kebabCase(emoji)} ${className || ''}`
  return <i className={cls.trim()} />
}
