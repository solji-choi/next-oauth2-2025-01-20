'use client'

import { Button } from '@/components/ui/button'
import { LoginMemberContext } from '@/stores/auth/loginMember'
import { use } from 'react'
import Logo from './Logo'
import MeMenuButton from './MeMenuButton'
import ThemeToggleButton from './ThemeToggleButton'

export default function WideHeaderContent({
  className,
}: {
  className?: string
}) {
  const { isLogin } = use(LoginMemberContext)
  return (
    <div className={`${className} py-2`}>
      <Button variant="link" asChild>
        <Logo text />
      </Button>
      <div className="flex-grow"></div>
      {isLogin && <MeMenuButton />}
      <ThemeToggleButton />
    </div>
  )
}
