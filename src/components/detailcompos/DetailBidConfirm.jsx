import React, { Fragment, useEffect, useState } from "react";
import { ArrowPathIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Button from "../Button";
import { formatDateTime } from "./DetailContainer";
import { useRecoilState } from "recoil";
import { bidPriceState } from "../../atom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

const warningText = [
  "낙찰 후 취소하고자 하는 경우, 낙찰자는 낙찰철회비로 낙찰가의 30%에 해당하는 금액을 납부하여야 하므로 신중하게 응찰하시기 바랍니다.",
  "응찰 시 유의사항 경매에 참여하기 전에 상품의 상세 정보를 반드시 확인하시기 바랍니다. 제품 상태, 설명, 사진 등을 꼼꼼히 검토해 주세요.",
  "낙찰 후 24시간 이내에 결제를 완료해 주셔야 합니다. 기한 내에 결제가 이루어지지 않을 경우 낙찰이 자동으로 취소될 수 있습니다.",
  "부정한 방법으로 경매에 참여할 경우, 해당 계정은 영구적으로 이용이 제한될 수 있습니다. 정직한 참여를 부탁드립니다.",
];

const DetailBidConfirm = ({ startPrice, remainingTime, nowHighPrice }) => {
  const { id } = useParams();
  const [bidMoney, setBidMoney] = useState(nowHighPrice);
  const [loading, setLoading] = useState(false);
  const [isTotalBid, setIsTotalBid] = useState(true);
  const [bidCheck, setBidCheck] = useState(false);

  const [totalList, setTotalList] = useState([]);
  const [cookie] = useCookies();

  const agreeBid = () => {
    // navigate("/")
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/bids/${id}/buy`,
        {
          price: bidMoney,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.accessToken}`,
          },
        }
      )
      .then((res) => {
        alert("응찰 되었습니다");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  const notAgreeChild = (
    <div>
      <div className="font-bold">응찰 주의 사항</div>
      <div className="py-4 border-b border-borderColor">
        {warningText.map((text, i) => (
          <div key={i} className="pb-5 text-sm">
            ∙ {text}
          </div>
        ))}
      </div>
      <div className="text-center py-7 text-lg font-bold">
        온라인 경매 및 위 응찰 유의사항을 확인하였으며,
        <br /> 동의하므로 응찰합니다
      </div>

      <div onClick={agreeBid}>
        <Button text="동의 및 응찰" />
      </div>
    </div>
  );

  function generatePriceList(startPrice) {
    let priceList = [];
    let increment = startPrice <= 100000 ? 1000 : 10000;

    for (let i = 0; i < 10; i++) {
      priceList.push(startPrice + i * increment);
    }

    return priceList;
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/bids/${id}/histories`)
      .then((res) => {
        setTotalList(res.data.data.bidHistories);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {bidCheck ? (
        notAgreeChild
      ) : (
        <Fragment>
          <div className="bg-bgColor text-center py-3 space-y-2">
            <p className="text-xs font-thin">남은 시간</p>
            <p className="">{remainingTime}</p>
          </div>
          <div>
            <div className=" flex justify-center space-x-4 text-xs font-thin py-3">
              <p
                className={`${isTotalBid ? "font-normal underline" : " "}`}
                onClick={() => setIsTotalBid(true)}
              >
                전체({totalList.length})
              </p>
            </div>
            <div className="h-40 overflow-y-scroll">
              {isTotalBid
                ? totalList.map((item, index) => (
                    <div
                      key={index}
                      className="py-2 border-b border-borderColor"
                    >
                      <p className="font-thin text-xs">
                        {formatDateTime(item.createdAt)}
                      </p>
                      <div className="flex justify-between px-4">
                        <p className="pl-4">{item.memberName}</p>
                        <div>{item.price}</div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="grid grid-cols-2 pt-10 items-center gap-2 pb-7">
            <div>시작가</div>
            <div>{startPrice}원</div>
            <div>현재 최고 응찰가</div>
            <div className="text-warningColor flex items-center">
              {nowHighPrice}원
              <ArrowPathIcon
                className={`size-6 ml-2 cursor-pointer ${
                  loading ? "animate-spin" : ""
                }`}
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                  }, 1000);
                }}
              />
            </div>
            <div>응찰가</div>
            <div className="dropdown dropdown-top ">
              <div
                tabIndex={0}
                role="button"
                className="border border-borderColor p-1 relative"
              >
                {bidMoney}
                <p className="absolute right-1 top-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </p>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content  menu block bg-base-100 rounded-box z-[1] w-52 p-2 m-1 shadow h-40 overflow-y-scroll"
              >
                {generatePriceList(nowHighPrice).map((price) => (
                  <li onClick={() => setBidMoney(price)} key={price}>
                    <a>{price}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div onClick={() => setBidCheck((prev) => !prev)}>
            <Button text="응찰하기" />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default DetailBidConfirm;
