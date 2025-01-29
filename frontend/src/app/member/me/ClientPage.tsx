'use client'

import { LoginMemberContext } from '@/stores/auth/loginMember'
import { use } from 'react'

export default function ClientPage() {
  const { loginMember } = use(LoginMemberContext)

  return (
    <div className="flex-1 flex justify-center items-center">
      <div>
        <div>별명 : {loginMember.nickname}</div>
        <div className="mt-2 flex justify-center">
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={loginMember.profileImgUrl}
          />
        </div>
      </div>
    </div>
  )
}
