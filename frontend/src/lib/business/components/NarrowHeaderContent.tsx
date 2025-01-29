'use client'

import { Button } from '@/components/ui/button'
import { LoginMemberContext } from '@/stores/auth/loginMember'
import {
  LogOut,
  Menu,
  MonitorCog,
  Pencil,
  TableOfContents,
  User,
} from 'lucide-react'
import { use } from 'react'
import Logo from './Logo'
import MeMenuButton from './MeMenuButton'
import ThemeToggleButton from './ThemeToggleButton'
import Link from 'next/link'
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from '@/components/ui/drawer'
import { useRouter } from 'next/navigation'
import client from '@/lib/backend/client'

export default function NarrowHeaderContent({
  className,
}: {
  className?: string
}) {
  const { isLogin, loginMember, isAdmin, removeLoginMember } = use(
    LoginMemberContext,
  )
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
    <div className={`${className} py-1`}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="link">
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="sr-only">
            <DrawerTitle>전체 메뉴</DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div className="max-h-[calc(100dvh-150px)] pb-2 overflow-y-auto px-2">
            <ul>
              <li>
                <Button variant="link" className="w-full justify-start" asChild>
                  <Link href="/post/list">
                    <TableOfContents /> 글
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="w-full justify-start" asChild>
                  <Link href="/post/write">
                    <Pencil /> 작성
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="w-full justify-start" asChild>
                  <Logo text />
                </Button>
              </li>
              <li>
                <Button variant="link" className="w-full justify-start" asChild>
                  <Link href="/member/me">
                    <User /> {loginMember.nickname}
                  </Link>
                </Button>
              </li>
              {isAdmin && (
                <li>
                  <Button
                    variant="link"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/adm">
                      <MonitorCog /> 관리자 홈
                    </Link>
                  </Button>
                </li>
              )}
              <li>
                <Button
                  variant="link"
                  className="w-full justify-start"
                  onClick={logout}
                >
                  <LogOut /> 로그아웃
                </Button>
              </li>
            </ul>
          </div>
        </DrawerContent>
      </Drawer>

      <Button variant="link" asChild>
        <Logo />
      </Button>
      <div className="flex-grow"></div>
      {isLogin && <MeMenuButton />}
      <ThemeToggleButton />
    </div>
  )
}
