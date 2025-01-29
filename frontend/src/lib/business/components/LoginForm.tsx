'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import client from '@/lib/backend/client'
import { LoginMemberContext } from '@/stores/auth/loginMember'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-sm px-3"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>아이디</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  autoComplete="off"
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mt-2"
        >
          {form.formState.isSubmitting ? '로그인 중...' : '로그인'}
        </Button>
      </form>
    </Form>
  )
}
