import { Fragment } from "react";
import Naver from "../../asset/naver.png";
import Logo from "../../asset/logo.png";
import { useRecoilState } from "recoil";
import { loginState } from "../../atom";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import axios from "axios";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/members/login`, data)
      .then((r) => {
        setCookie("accessToken", r.data.data.accessToken);
        setCookie("nickname", r.data.data.nickname);
        navigate("/");
      })
      .catch((e) => console.log(e));
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[500px] flex flex-col gap-3"
        >
          <div className="flex flex-col gap-2">
            <div>이메일</div>
            <input
              {...register("email")}
              type="email"
              name="email"
              className="inputText"
              placeholder="이메일을 입력해주세요."
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>비밀번호</div>
            <input
              {...register("password")}
              type="password"
              name="password"
              className="inputText"
              placeholder="비밀번호를 입력해주세요."
            />
          </div>
          <Button text="로그인" isGray={false} />
        </form>
      </div>
    </Fragment>
  );
}
