'use client'

import { components } from '@/lib/backend/apiV1/schema'
import client from '@/lib/backend/client'
import { createContext, use, useState } from 'react'

type Member = components['schemas']['MemberDto']

export const LoginMemberContext = createContext<{
  loginMember: Member
  setLoginMember: (member: Member) => void
  isLogin: boolean
  isLoginMemberPending: boolean
  isAdmin: boolean
  logout: (callback: () => void) => void
}>({
  loginMember: createEmptyMember(),
  setLoginMember: () => {},
  isLogin: false,
  isLoginMemberPending: true,
  isAdmin: false,
  logout: (callback: () => void) => {},
})

function createEmptyMember(): Member {
  return {
    id: 0,
    createDate: '',
    modifyDate: '',
    nickname: '',
    profileImgUrl: '',
  }
}

export function useLoginMember() {
  const [isLoginMemberPending, setLoginMemberPending] = useState(true)
  const [loginMember, _setLoginMember] = useState<Member>(createEmptyMember())

  const removeLoginMember = () => {
    _setLoginMember(createEmptyMember())
    setLoginMemberPending(false)
  }

  const setLoginMember = (member: Member) => {
    _setLoginMember(member)
    setLoginMemberPending(false)
  }

  const setNoLoginMember = () => {
    setLoginMemberPending(false)
  }

  const isLogin = loginMember.id !== 0
  const isAdmin = loginMember.id === 2

  const logout = (callback: () => void) => {
    client.DELETE('/api/v1/members/logout').then((res) => {
      removeLoginMember()
      callback()
    })
  }

  return {
    loginMember,
    logout,
    isLogin,
    isLoginMemberPending,
    setLoginMember,
    isAdmin,
    setNoLoginMember,
  }
}

export function useGlobalLoginMember() {
  return use(LoginMemberContext)
}
