import { HeartIcon } from "@heroicons/react/24/outline";
import logo from "../asset/logo.png";
import { useNavigate } from "react-router-dom";

export default function ListCard() {
  const navigate = useNavigate();
  const itemId = 1;
  return (
    <div
      onClick={() => navigate(`/detail/${itemId}`)}
      className="w-[200px] border-2 rounded-md border-borderColor overflow-hidden group hover:shadow-xl hover:scale-105 transition duration-500"
    >
      <div className="w-full h-[150px] flex flex-col overflow-hidden">
        <div className="m-2 self-end absolute rounded-full bg-white shadow-md p-1 z-50">
          <HeartIcon className="size-5" />
        </div>
        <div
          src={logo}
          className="h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500 relotive z-10"
          style={{
            backgroundImage: `url(${logo})`,
          }}
        />
      </div>
      <div className="py-2 px-2">
        <div className="opacity-50">username</div>
        <div className="text-[20px] my-1">제 맥북 사세요~</div>
        <div className="text-[13px] flex justify-between opacity-50">
          <span className="font-bold">시작가</span>
          <span>15,000</span>
        </div>
        <div className="opacity-50 text-[13px] py-2">
          간략한 소개 적었던 자리 와라라랄라라ㅏ라라ㅏㄹㄹ
        </div>
        <hr />
        <div className="text-[13px] py-2 opacity-50">실시간 경매</div>
      </div>
    </div>
  );
}
