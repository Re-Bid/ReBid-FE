import React from "react";
import logo from "../asset/logo.png";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
const Notfound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <div className="flex flex-col items-center">
        <div
          className="size-24 bg-center bg-cover"
          style={{
            backgroundImage: `url(${logo})`,
          }}
        />
        <div className="text-3xl">페이지를 찾을 수 없습니다!</div>
      </div>
      <div className="w-[500px] grid grid-cols-2">
        <div className="px-2" onClick={() => navigate("/")}>
          <Button text={"홈으로 돌아가기"} isGray={false} />
        </div>
        <div className="px-2" onClick={() => navigate(-1)}>
          <Button text={"이전 페이지로 돌아가기"} isGray={true} />
        </div>
      </div>
    </div>
  );
};

export default Notfound;
