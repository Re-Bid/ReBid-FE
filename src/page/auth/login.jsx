import { Fragment } from "react";
import Naver from "../../asset/naver.png"
import Logo from "../../asset/logo.png"

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center mt-80 space-y-24">
      <div className='text-center space-y-4 relative'>
        <img src={Logo} className="absolute opacity-10 -top-56 z-0" />
        <div className="font-gmarket text-7xl">
          Re:Bid
        </div>
        <div className="font-thin">
          저희는 리싸이클링 제품 경매 판매 사이트입니다.<br />
          환경을 생각하고, 자원을 재활용하는 특별한 경매를 통해 더 나은 미래를 만들어가고 있습니다.<br />
          로그인을 통해 여러분도 동참해 주세요!<br />
        </div>
      </div>
      <div className="btn btn-lg bg-white border-none p-0 z-10 relative">
        <img src={Naver} className="w-full h-full" />
      </div>
    </div>
  )
    ;
}
