'use client'

import { Button } from '@/components/ui/button'
import { LoginMemberContext, useLoginMember } from '@/stores/auth/loginMember'
import { Home, Triangle } from 'lucide-react'
import Link from 'next/link'
import MeMenuButton from './MeMenuButton'
import ThemeToggleButton from './ThemeToggleButton'
import { use } from 'react'

export default function WideHeaderContent({
  className,
}: {
  className?: string
}) {
  const { isLogin } = use(LoginMemberContext)
  return (
    <div className={`${className} py-2`}>
      <Button variant="link" asChild>
        <Link href="/">
          <Triangle /> 글로그
        </Link>
      </Button>
      <div className="flex-grow"></div>
      {isLogin && <MeMenuButton />}
      <ThemeToggleButton />
    </div>
  )
}
