'use client'

import { Button } from '@/components/ui/button'
import { useGlobalLoginMember } from '@/stores/auth/loginMember'
import { Pencil, TableOfContents } from 'lucide-react'
import Link from 'next/link'
import Logo from './Logo'
import MeMenuButton from './MeMenuButton'
import ThemeToggleButton from './ThemeToggleButton'

export default function WideHeaderContent({
  className,
}: {
  className?: string
}) {
  const { isLogin } = useGlobalLoginMember()

  return (
    <div className={`${className} py-2`}>
      <Button variant="link" asChild>
        <Logo text />
      </Button>
      <Button variant="link" asChild>
        <Link href="/post/list">
          <TableOfContents /> 글
        </Link>
      </Button>
      {isLogin && (
        <Button variant="link" asChild>
          <Link href="/post/list">
            <Pencil /> 작성
          </Link>
        </Button>
      )}
      <div className="flex-grow"></div>
      {isLogin && <MeMenuButton />}
      <ThemeToggleButton />
    </div>
  )
}
