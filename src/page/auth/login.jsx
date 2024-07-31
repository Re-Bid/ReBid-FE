import { Fragment, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import axios from "axios";

import naver from "../../asset/naver.png";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [cookie, setCookie] = useCookies(["user-info"]);
  const [denial, setDenial] = useState(false);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/members/login`, data)
      .then((r) => {
        setCookie("accessToken", r.data.data.accessToken, {
          maxAge: 18000,
        });
        setCookie("nickname", r.data.data.nickname, { maxAge: 18000 });
        navigate("/");
      })
      .catch((e) => setDenial(true));
  };
  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center py-24">
        <div className="text-center space-y-4 relative mb-10">
          <div className="font-gmarket text-7xl">Re:Bid</div>
          <div className="font-thin">
            당신에게 <strong>유일</strong>함을 선사합니다.
          </div>
        </div>
        <Link
          to={`${process.env.REACT_APP_BASE_URL}/oauth2/authorization/naver`}
        >
          <img src={naver} alt="" className="h-10 bg-cover" />
        </Link>

        {/* <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[500px] flex flex-col gap-3"
        >
          <div className="flex flex-col gap-2">
            <div>이메일</div>
            <input
              {...register("email")}
              type="email"
              name="email"
              className={`inputText ${denial ? "border-warningColor" : ""}`}
              placeholder="이메일을 입력해주세요."
              required
            />
            {denial ? (
              <div className="font-thin text-warningColor text-[13px]">
                이메일을 확인해주세요
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <div>비밀번호</div>
            <input
              {...register("password")}
              type="password"
              name="password"
              className={`inputText ${denial ? "border-warningColor" : ""}`}
              placeholder="비밀번호를 입력해주세요."
              required
            />
            {denial ? (
              <div className="font-thin text-warningColor text-[13px]">
                비밀번호를 확인해주세요
              </div>
            ) : null}
          </div>
          <Button text="로그인" isGray={false} />
        </form>

        <div className="font-thin py-2">
          계정이 없으신가요?{" "}
          <span
            className="font-bold cursor-pointer hover:underline-offset-4 hover:underline"
            onClick={() => navigate("/signup")}
          >
            아주 간단한 회원가입 하러 가기 &rarr;
          </span>
        </div> */}
      </div>
    </Fragment>
  );
}
