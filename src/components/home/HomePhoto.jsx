import { HeartIcon as Heart } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePhoto({ image, name, bidId }) {
  const [isCursor, setIsCursor] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/bids/${bidId}`)
      .then((r) => {
        setIsLike(r.data.data.isHeart);
        setPrice(r.data.data.startPrice);
      })
      .catch((e) => console.log(e));
  }, []);
  const onMouseEvent = () => {
    setIsCursor((prev) => !prev);
  };
  const onLike = async () => {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/bids/${bidId}/heart?bidId=${bidId}`,
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MiwiaWF0IjoxNzIyMzY2MDA5LCJleHAiOjE3MjIzODQwMDl9.8DBuDgU1Jfzb7Oda4IFistbFjt_FVoa8WkOzwO0i9AE"}`,
      },
    })
      .then((r) => {
        setIsLike((prev) => !prev);
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      {isCursor ? (
        <div
          onClick={() => navigate(`/detail/${bidId}`)}
          onMouseLeave={onMouseEvent}
          className="cursor-pointer animate-onMouseEnter bg-black w-[200px] h-[150px] absolute bg-opacity-50 flex flex-col px-2 py-2 justify-between"
        >
          {isLike ? (
            <HeartIcon
              onClick={onLike}
              className="size-4 text-white self-end hover:bg-white/30 rounded-full"
            />
          ) : (
            <Heart
              onClick={onLike}
              className="size-4 text-white self-end hover:bg-white/30 rounded-full"
            />
          )}

          <div className="text-white self-start flex flex-col items-start">
            <div className="text-[13px]">{name}</div>
            <div className="font-light text-[12px]">시작가 ₩{price}</div>
          </div>
        </div>
      ) : null}
      <div className="w-[200px] h-[150px] cursor-pointer">
        <div onMouseEnter={onMouseEvent} className="h-full bg-neutral-200">
          <img src={image} alt="image" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
