'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useGlobalLoginMember } from '@/stores/auth/loginMember'
import { LogOut, MonitorCog, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function MeMenuButton() {
  const { isAdmin, loginMember, logout: _logout } = useGlobalLoginMember()
  const router = useRouter()

  const logout = () => {
    _logout(() => router.replace('/'))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link">
          <Image
            className="w-8 h-8 rounded-full object-cover"
            src={loginMember.profileImgUrl}
            width={32}
            height={32}
            quality={100}
            alt={''}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Button variant="link" className="w-full justify-start" asChild>
            <Link href="/member/me">
              <User /> {loginMember.nickname}
            </Link>
          </Button>
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem>
            <Button variant="link" className="w-full justify-start" asChild>
              <Link href="/adm">
                <MonitorCog /> 관리자 홈
              </Link>
            </Button>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Button
            variant="link"
            className="w-full justify-start"
            onClick={logout}
          >
            <LogOut /> 로그아웃
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
