import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import Button from "../Button";
import DetailModal from "./DetailModal";
import DetailAdminDeny from "./admin/DetailAdminDeny";
import DetailAdminModal from "./admin/DetailAdminModal";
import DetailBidConfirm from "./DetailBidConfirm";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { bidPriceState } from "../../atom";
import TimeCountDown from "../TimeCountDown";
import axios from "axios";
import { useCookies } from "react-cookie";
import NaverPayButton from "../NaverPayButton";

export function formatDateTime(targetDateString) {
  // 입력된 날짜와 시간을 파싱
  const date = new Date(targetDateString);

  // 월, 일, 시간, 분 추출
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더함
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  // 원하는 형식으로 변환
  return `${month}월 ${day}일 ${hours}:${minutes}`;
}

const DetailContainer = ({
  bidId,
  time,
  productName,
  startPrice,
  nowHighPrice,
  info,
  bidType,
  isAdmin,
  isSell,
  isHeart,
}) => {
  const [loading, setLoading] = useState(false);
  const [heartClick, setHeartClick] = useState(isHeart);
  const [agreeClick, setAgreeClick] = useState(false);

  const [bidPrice, setBidPrice] = useRecoilState(bidPriceState);

  const [cookie] = useCookies();

  const navigate = useNavigate();

  const heardClickFunc = () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/bids/${bidId}/heart?bidId=${bidId}`,
      headers: { Authorization: `Bearer ${cookie.accessToken}` },
    })
      .then((r) => {
        setHeartClick((prev) => !prev);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="flex-1 ">
      <div className="text-end pb-3">
        <div className="text-end">
          <p>남는 시간</p>
          {isAdmin ? null : <TimeCountDown date={time} />}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-3xl">{productName}</div>
        {heartClick ? (
          <SolidHeartIcon
            onClick={() => heardClickFunc()}
            className=" size-6 cursor-pointer  bg-white rounded-full"
          />
        ) : (
          <OutlineHeartIcon
            onClick={() => heardClickFunc()}
            className=" size-6 cursor-pointer  bg-white rounded-full"
          />
        )}
      </div>
      <div className="whitespace-pre-line py-3">{info}</div>
      <hr className="border-borderColor" />
      <div className="py-4 grid grid-cols-2 gap-4 border-b border-borderColor">
        <div> 시작가</div>
        <div>{startPrice}</div>
        {isSell ? (
          <Fragment>
            <div>낙찰가</div>
            <div className="text-warningColor">30,000원</div>
          </Fragment>
        ) : isAdmin ? null : (
          <Fragment>
            <div>현재 최고 응찰가</div>
            <div className="text-warningColor flex items-center space-x-2">
              <div>{nowHighPrice}</div>
              <ArrowPathIcon
                className={`size-6 cursor-pointer ${loading ? "animate-spin" : ""
                  }`}
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                  }, 1000);
                }}
              />
            </div>
          </Fragment>
        )}
      </div>
      <div className="space-y-4 py-4 ">
        {isAdmin ? (
          <Fragment>
            <div
              className="w-full"
              onClick={() => document.getElementById("deny").showModal()}
            >
              <Button text="반려하기" isGray />
              <DetailAdminModal id={"deny"} title="반려하기" bidId={bidId} />
            </div>
            <div
              className="w-full"
              onClick={() => document.getElementById("approve").showModal()}
            >
              <Button text="승인하기" />
              <DetailAdminModal
                id={"approve"}
                bidType={bidType}
                bidId={bidId}
              />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="bg-bgColor p-3 rounded-md text-center ">
              {isSell ? (
                "🎊축하합니다! 낙찰되셨습니다!🎊"
              ) : (
                <Fragment>
                  마감시간 :
                  <span className="text-warningColor pl-1">
                    {formatDateTime(time)}
                  </span>
                </Fragment>
              )}
            </div>
            {isSell ? (
              <NaverPayButton />
            ) : (
              <Fragment>
                <div
                  onClick={() =>
                    document.getElementById("응찰하기").showModal()
                  }
                >
                  <Button text="응찰하기" />
                </div>

                <DetailModal
                  title={"응찰 내역"}
                  child={
                    <DetailBidConfirm
                      startPrice={startPrice}
                      nowHighPrice={nowHighPrice}
                      remainingTime={<TimeCountDown date={time} />}
                      setBidPrice={setBidPrice}
                      bidId={bidId}
                    />
                  }
                  id={"응찰하기"}
                />
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default DetailContainer;
