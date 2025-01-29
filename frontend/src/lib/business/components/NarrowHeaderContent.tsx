'use client'

import { Button } from '@/components/ui/button'
import { LoginMemberContext } from '@/stores/auth/loginMember'
import { Menu, Pencil, TableOfContents } from 'lucide-react'
import { use } from 'react'
import Logo from './Logo'
import MeMenuButton from './MeMenuButton'
import ThemeToggleButton from './ThemeToggleButton'
import Link from 'next/link'

export default function NarrowHeaderContent({
  className,
}: {
  className?: string
}) {
  const { isLogin } = use(LoginMemberContext)
  return (
    <div className={`${className} py-1`}>
      <Button variant="link">
        <Menu />
      </Button>
      <Button variant="link" asChild>
        <Logo />
      </Button>
      <Button variant="link" asChild>
        <Link href="/post/list">
          <TableOfContents /> 글
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/post/write">
          <Pencil /> 작성
        </Link>
      </Button>
      <div className="flex-grow"></div>
      {isLogin && <MeMenuButton />}
      <ThemeToggleButton />
    </div>
  )
}
