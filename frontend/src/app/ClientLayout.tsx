'use client'

import Image from 'next/image'

import ThemeToggleButton from '@/lib/business/components/ThemeToggleButton'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import * as React from 'react'

import { Home, LogIn, LogOut, Settings, User } from 'lucide-react'

// 로그인 한 회원의 정보는 전역상태로 관리하는 것이 좋다.
// LoginMemberContext : 이 컴포넌트의 하위 클라이언트 컴포넌트는 Context의 value 값을 `use` 함수로 얻을 수 있다.
// useLoginMember : 현재 로그인한 회원의 정보(상태), 그리고 해당 정보와 관련된 함수들을 리턴해준다.
import { LoginMemberContext, useLoginMember } from '@/stores/auth/loginMember'

import { Button } from '@/components/ui/button'
import client from '@/lib/backend/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function ClientLayout({
  children,
}: React.ComponentProps<typeof NextThemesProvider>) {
  // 로그아웃 후 홈으로 이동하기 위해서 로드
  const router = useRouter()

  // 훅을 통해서 로그인 한 회원의 정보(state)와 관련된 함수들을 얻는다.
  const {
    setLoginMember,
    isLogin,
    loginMember,
    removeLoginMember,
    isLoginMemberPending,
    isAdmin,
    setNoLoginMember,
  } = useLoginMember()

  // Context를 통해서 전역적으로 공유할 값을 만든다.
  const loginMemberContextValue = {
    loginMember,
    setLoginMember,
    removeLoginMember,
    isLogin,
    isLoginMemberPending,
    isAdmin,
    setNoLoginMember,
  }

  useEffect(() => {
    // useEffect 의 인자는 async 함수를 넣을 수 없다.
    // 그래서 아래에서 프로미스 문법사용
    // 참고로 현재 브라우저에 쿠키가 있어도 http only 이기 때문에 로그인한 회원의 정보는 이렇게 확인해야 한다.
    client.GET('/api/v1/members/me').then((res) => {
      if (res.error) {
        // accessToken 쿠키와 apiKey 쿠키 중 둘다 없거나 둘다 만료된 경우 여기가 실행된다.
        setNoLoginMember()
      } else {
        // accessToken 쿠키 or apiKey 쿠키 중 하나가 유효하다면 여기가 실행된다.
        setLoginMember(res.data)
      }
    })
  }, [])

  // isLoginMemberPending 의 시작상태는 true 이다.
  // 해당값이 true 라는 것은 아직 로그인 상태인지 아닌지 판별되기 전이라는 의미이다.
  // setLoginMember, setNoLoginMember, removeLoginMember 함수가 호출되면 해당값이 false 로 변경된다.
  if (isLoginMemberPending) {
    return (
      <div className="flex-1 flex justify-center items-center text-muted-foreground">
        인증 정보 로딩중...
      </div>
    )
  }

  const logout = () => {
    // 이제 로그아웃도 쿠키를 지운 후 로컬 상태를 갱신한다.
    // 참고로 토큰 쿠키들을 http only 이기 때문에 이렇게 삭제해야 한다.
    client.DELETE('/api/v1/members/logout').then((res) => {
      removeLoginMember()
      router.replace('/')
    })
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LoginMemberContext value={loginMemberContextValue}>
        {/* 이 안의 모든 곳에서 `loginMemberContextValue` 변수를 `use` 함수를 통해서 접근할 수 있다. */}
        {/* 하지만 여기서는 어짜피 useLoginMember 함수의 실행결과가 바로 있기 때문에 딱히 `use` 를 사용할 필요가 없다. */}
        <header className="flex p-2">
          <Button variant="link" asChild>
            <Link href="/">
              <Home /> 홈
            </Link>
          </Button>
          {isAdmin && (
            <Button variant="link" asChild>
              <Link href="/adm">
                <Settings /> 관리자
              </Link>
            </Button>
          )}
          {isLogin && (
            <Button variant="link" asChild>
              <Link href="/member/me">
                <User /> {loginMember.nickname}
                <Image
                  className="w-8 h-8 rounded-full object-cover"
                  src={loginMember.profileImgUrl}
                  width={32}
                  height={32}
                  quality={100}
                  alt={''}
                />
              </Link>
            </Button>
          )}
          {isLogin && (
            <Button variant="link" onClick={logout}>
              <LogOut /> 로그아웃
            </Button>
          )}
          {!isLogin && (
            <Button variant="link" asChild>
              <Link href="/adm/member/login">
                <LogIn /> 관리자 로그인
              </Link>
            </Button>
          )}
          <div className="flex-grow"></div>
          <ThemeToggleButton />
        </header>
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="p-2 flex justify-center">
          <span>© 2025 글로그</span>
        </footer>
      </LoginMemberContext>
    </NextThemesProvider>
  )
}
