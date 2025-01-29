'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import client from '@/lib/backend/client'
import { LoginMemberContext } from '@/stores/auth/loginMember'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const loginFormSchema = z.object({
  username: z
    .string()
    .min(1, '아이디를 입력해주세요.')
    .min(4, '아이디는 4자 이상이여야 합니다.')
    .max(20, '아이디는 20자 이하여야 합니다.'),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요.')
    .min(4, '비밀번호는 4자 이상이어야 합니다.')
    .max(20, '비밀번호는 20자 이하여야 합니다.'),
})

type LoginFormInputs = z.infer<typeof loginFormSchema>

export default function LoginForm() {
  const router = useRouter()
  const { setLoginMember } = use(LoginMemberContext)
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  })

  const onSubmit = async (data: LoginFormInputs) => {
    try {
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
    } catch (error) {
      toast({
        title: '로그인 중 오류가 발생했습니다',
        variant: 'destructive',
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-sm px-3"
    >
      <div className="flex flex-col gap-2">
        <label className="font-medium">아이디</label>
        <input
          {...register('username')}
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
          {...register('password')}
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
      <Button type="submit" disabled={isSubmitting} className="mt-2">
        {isSubmitting ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  )
}
