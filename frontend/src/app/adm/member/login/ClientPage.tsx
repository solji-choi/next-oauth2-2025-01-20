'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import client from '@/lib/backend/client'
import { LoginMemberContext } from '@/stores/auth/loginMember'
import { useRouter } from 'next/navigation'
import { use } from 'react'

export default function ClientPage() {
  const router = useRouter()
  const { setLoginMember } = use(LoginMemberContext)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement

    if (form.username.value.length === 0) {
      toast({
        title: '아이디를 입력해주세요.',
        variant: 'destructive',
      })
      form.username.focus()
      return
    }

    if (form.password.value.length === 0) {
      toast({
        title: '비밀번호를 입력해주세요.',
        variant: 'destructive',
      })
      form.password.focus()
      return
    }

    const response = await client.POST('/api/v1/members/login', {
      body: {
        username: form.username.value,
        password: form.password.value,
      },
    })

    if (response.error) {
      toast({
        title: response.error.msg,
        variant: 'destructive',
      })
      return
    }

    toast({
      title: response.data.msg,
    })

    setLoginMember(response.data.data.item)

    router.replace('/')
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-8">
      <h1 className="text-2xl font-bold">관리자 로그인</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <div className="flex flex-col gap-2">
          <label className="font-medium">아이디</label>
          <input
            type="text"
            name="username"
            className="p-2 border rounded-md bg-inherit"
            placeholder="아이디를 입력해주세요"
            autoComplete="off"
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">비밀번호</label>
          <input
            type="password"
            name="password"
            className="p-2 border rounded-md bg-inherit"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <Button type="submit" className="mt-2">
          로그인
        </Button>
      </form>
    </div>
  )
}
