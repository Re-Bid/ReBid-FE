import React from "react";
import Logo from "../../asset/logo.png";
import Naver from "../../asset/circleNaver.png";
import { useForm } from "react-hook-form";
import Button from "../Button";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  return (
    <form className="flex flex-col items-center py-7">
      <div className="w-96">
        <div className="flex justify-center">
          <img src={Logo} className="w-20 h-20" />
        </div>
        <div className="space-y-10 mb-10">
          <div className="space-y-2">
            <div>이메일</div>
            <div className="bg-bgColor flex items-center p-3 rounded-lg space-x-2">
              <img src={Naver} className="w-5 h-5" />
              <div>sand8594@naver.com</div>
            </div>
          </div>
          <div className="space-y-2">
            <div>주소</div>
            <input className="inputText" placeholder="주소를 입력해주세요" />
          </div>
        </div>
        <div className="space-y-2 mb-20">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="checkbox" />
            <div>이용약관 동의</div>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="checkbox" />
            <div>개인정보 수집 이용 동의</div>
          </label>
        </div>
        <Button text={"가입"} isGray={false} />
      </div>
    </form>
  );
};

export default SignUp;
