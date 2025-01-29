'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import client from '@/lib/backend/client'
import { LoginMemberContext } from '@/stores/auth/loginMember'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import { useForm } from 'react-hook-form'

interface LoginFormInputs {
  username: string
  password: string
}

export default function LoginForm() {
  const router = useRouter()
  const { setLoginMember } = use(LoginMemberContext)
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>()

  const onSubmit = async (data: LoginFormInputs) => {
    const response = await client.POST('/api/v1/members/login', {
      body: {
        username: data.username,
        password: data.password,
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-sm px-3"
    >
      <div className="flex flex-col gap-2">
        <label className="font-medium">아이디</label>
        <input
          {...register('username', { required: '아이디를 입력해주세요' })}
          type="text"
          className="p-2 border rounded-md bg-inherit"
          placeholder="아이디를 입력해주세요"
          autoComplete="off"
          autoFocus
        />
        {errors.username && (
          <span className="text-sm text-red-500">
            {errors.username.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium">비밀번호</label>
        <input
          {...register('password', { required: '비밀번호를 입력해주세요' })}
          type="password"
          className="p-2 border rounded-md bg-inherit"
          placeholder="비밀번호를 입력해주세요"
        />
        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>
      <Button type="submit" className="mt-2">
        로그인
      </Button>
    </form>
  )
}
