import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import logo from "../asset/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function ListCard({ ...props }) {
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [isLike, setIsLike] = useState(false);

  const [cookie] = useCookies();

  const onHeartClick = async () => {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/bids/${detail.bidId}/heart?bidId=${detail.bidId}`,
      headers: {
        Authorization: `Bearer ${cookie.accessToken}`,
      },
    })
      .then((r) => {
        setIsLike((prev) => !prev);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/bids/${props.bidId}`)
      .then((res) => {
        setDetail(res.data.data);
      });
  }, [isLike]);
  return (
    <div className="w-[200px] border-2 rounded-md border-borderColor overflow-hidden group relative hover:shadow-xl hover:scale-105 transition duration-500">
      <div
        onClick={() => {
          onHeartClick();
        }}
        className="m-2 self-end absolute right-0 top-0 rounded-full bg-white shadow-md p-1 z-50"
      >
        {detail?.isHeart ? (
          <HeartIcon className="size-5" />
        ) : (
          <HeartOutline className="size-5 hover:fill-black" />
        )}
      </div>
      <div
        onClick={() => navigate(`/detail/${detail.bidId}`)}
        className="w-full h-[150px] flex flex-col overflow-hidden"
      >
        <div
          src={logo}
          className="h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500 relotive z-10"
          style={{
            backgroundImage: `url(${detail?.imageUrls[0]})`,
          }}
        />
      </div>
      <div className="py-2 px-2">
        <div className="opacity-50">username</div>
        <div className="text-[20px] my-1">{detail?.itemName}</div>
        <div className="text-[13px] flex justify-between opacity-50 pb-2">
          <span className="font-bold">시작가</span>
          <span>₩{detail?.startPrice}</span>
        </div>
        <div className="text-[13px] flex justify-between opacity-50 pb-2">
          <span className="font-bold">현재가</span>
          <span>₩{detail?.currentPrice}</span>
        </div>
        <hr />
        <div className="opacity-50 text-[13px] py-2 h-[30px] truncate">
          {detail?.itemIntro}
        </div>
      </div>
    </div>
  );
}
