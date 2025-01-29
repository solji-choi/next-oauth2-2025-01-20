'use client'

import Link from 'next/link'
import Image from 'next/image'

import { LoginMemberContext } from '@/stores/auth/loginMember'
import { LogOut, MonitorCog, User } from 'lucide-react'
import { use } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import client from '@/lib/backend/client'
import { useRouter } from 'next/navigation'

export default function MeMenuButton() {
  const { isAdmin, loginMember, removeLoginMember } = use(LoginMemberContext)
  const router = useRouter()

  const logout = () => {
    // 이제 로그아웃도 쿠키를 지운 후 로컬 상태를 갱신한다.
    // 참고로 토큰 쿠키들을 http only 이기 때문에 이렇게 삭제해야 한다.
    client.DELETE('/api/v1/members/logout').then((res) => {
      removeLoginMember()
      router.replace('/')
    })
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
