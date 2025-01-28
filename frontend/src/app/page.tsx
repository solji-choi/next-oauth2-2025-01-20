'use client'

import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'

export default function Page() {
  const socialLoginForKakaoUrl = `http://localhost:8080/oauth2/authorization/kakao`
  const redirectUrlAfterSocialLogin = 'http://localhost:3000'

  const [isClicked, setIsClicked] = useState(false)

  return (
    <div className="flex-1 flex justify-center items-center">
      <div>
        <div
          className={`w-[100px] h-[100px] bg-red-500 on:bg-blue-500 ${
            isClicked ? 'on' : ''
          }`}
          onClick={() => setIsClicked(!isClicked)}
        >
          {isClicked ? 'clicked' : 'not clicked'}
        </div>
        <Button variant="outline" asChild>
          <a
            href={`${socialLoginForKakaoUrl}?redirectUrl=${redirectUrlAfterSocialLogin}`}
          >
            <MessageCircle />
            <span className="font-bold">카카오 로그인</span>
          </a>
        </Button>
      </div>
    </div>
  )
}
