"use client";

import { useGlobalLoginMember } from "@/stores/auth/loginMember";

import { Button } from "@/components/ui/button";

// LoginMemberContext(by React Context API) 를 통해서 공유되는 전역객체를 가져오기 위해
import { MessageCircle } from "lucide-react";

export default function ClientPage() {
  // frontend/src/app/ClientLayout.tsx 의 `<LoginMemberContext value={loginMemberContextValue}>` 를 통해서 공유된 value 에서 필요한 특정 값들만 가져온다.
  const { isLogin, loginMember } = useGlobalLoginMember();

  const socialLoginForKakaoUrl = `http://localhost:8080/oauth2/authorization/kakao`;
  const redirectUrlAfterSocialLogin = "http://localhost:3000";

  return (
    <div className="flex-1 flex justify-center items-center">
      {!isLogin && (
        <Button variant="outline" asChild>
          <a
            href={`${socialLoginForKakaoUrl}?redirectUrl=${redirectUrlAfterSocialLogin}`}
          >
            <MessageCircle />
            <span className="font-bold">카카오 로그인</span>
          </a>
        </Button>
      )}
      {isLogin && <div>{loginMember.nickname}님 환영합니다.</div>}
    </div>
  );
}
