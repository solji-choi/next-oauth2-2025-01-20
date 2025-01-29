'use client'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useGlobalLoginMember } from '@/stores/auth/loginMember'
import {
  LogOut,
  Menu,
  MonitorCog,
  Pencil,
  TableOfContents,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from './Logo'
import MeMenuButton from './MeMenuButton'
import ThemeToggleButton from './ThemeToggleButton'

export default function NarrowHeaderContent({
  className,
}: {
  className?: string
}) {
  const router = useRouter()

  const { isLogin, isAdmin, loginMember, logout } = useGlobalLoginMember()

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
                <DrawerClose asChild>
                  <Button
                    variant="link"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/post/list">
                      <TableOfContents /> 글
                    </Link>
                  </Button>
                </DrawerClose>
              </li>
              {isLogin && (
                <li>
                  <DrawerClose asChild>
                    <Button
                      variant="link"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/post/write">
                        <Pencil /> 작성
                      </Link>
                    </Button>
                  </DrawerClose>
                </li>
              )}
              <li className="py-2">
                <hr />
              </li>
              <li>
                <DrawerClose asChild>
                  <Button
                    variant="link"
                    className="w-full justify-start"
                    asChild
                  >
                    <Logo text />
                  </Button>
                </DrawerClose>
              </li>
              {isLogin && (
                <li>
                  <DrawerClose asChild>
                    <Button
                      variant="link"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/member/me">
                        <User /> {loginMember.nickname}
                      </Link>
                    </Button>
                  </DrawerClose>
                </li>
              )}
              {isAdmin && (
                <li>
                  <DrawerClose asChild>
                    <Button
                      variant="link"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/adm">
                        <MonitorCog /> 관리자 홈
                      </Link>
                    </Button>
                  </DrawerClose>
                </li>
              )}
              {isLogin && (
                <li>
                  <DrawerClose asChild>
                    <Button
                      variant="link"
                      className="w-full justify-start"
                      onClick={() => logout(() => router.replace('/'))}
                    >
                      <LogOut /> 로그아웃
                    </Button>
                  </DrawerClose>
                </li>
              )}
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
