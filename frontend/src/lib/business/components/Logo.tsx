'use client'

import { Rabbit, Triangle } from 'lucide-react'
import Link from 'next/link'

export default function Logo({ text, ...props }: { text?: boolean }) {
  return (
    <Link href="/" {...props}>
      <Rabbit />
      {text && <span>글로그</span>}
    </Link>
  )
}
