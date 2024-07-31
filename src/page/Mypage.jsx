import { UserIcon } from "@heroicons/react/24/solid";
import Tabel from "../components/Table";
import { Fragment, useEffect, useState } from "react";
import DetailModal from "../components/detailcompos/DetailModal";
import axios from "axios";
import { BID_STATUS } from "../components/BidType";
import { useCookies } from "react-cookie";

const message = (
  <div className="bg-bgColor py-2 px-3">
    안녕하세요,
    <br /> 고객님의 리싸이클링 목재 테이블에 대한 경매 승인 요청을 검토한 결과,
    다음과 같은 이유로 승인을 반려하게 되었음을 안내드립니다. <br /> <br /> 현재
    설정된 시작 가격이 시장 가치에 비해 지나치게 높게 책정되어 있습니다. 이는
    구매자들의 경매 참여를 저해하고, 판매 성사 가능성을 낮출 수 있습니다. <br />
    <br /> 당사의 플랫폼은 공정하고 합리적인 가격 형성을 통해 판매자와 구매자
    모두에게 만족스러운 거래 경험을 제공하는 것을 목표로 하고 있습니다. 따라서
    가격 조정 후 다시 요청해주시면, 보다 원활한 경매 진행이 가능할 것으로
    판단됩니다. <br />
    <br />
    가격 설정에 대한 추가적인 도움이 필요하시다면, 언제든지 고객 지원 팀에
    문의해주시기 바랍니다. <br /> 감사합니다.
  </div>
);
export default function Mypage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [cookie] = useCookies();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/members/myPage`, {
        headers: {
          Authorization: `Bearer ${cookie.accessToken}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Fragment>
      {loading ? (
        <div className="flex-col flex items-center gap-10 py-20">
          <DetailModal
            title={"입찰 거부 사유"}
            child={message}
            id={"승인거부"}
          />

          <div className="border-2 py-10 px-3 rounded-md flex items-center justify-between w-3/4">
            <div className="flex items-center gap-2">
              <div className="bg-neutral-300 size-[50px] rounded-full">
                <UserIcon className="text-white relative top-1" />
              </div>
              <div>
                <div className="font-bold">{data.nickname}</div>
                <div className="text-sm opacity-65">email@email.com</div>
              </div>
            </div>
            <div className="text-borderColor px-3 py-1 rounded-md border-2 ">
              프로필 관리
            </div>
          </div>

          <div className="w-full flex items-center flex-col gap-4">
            <div className="w-3/4 flex flex-col items-center gap-4">
              <div className="self-start font-bold text-lg">구매 내역</div>
              <div className="bg-[#FAFAFA] py-2 h-[100px] px-10 rounded-md flex items-center justify-around w-full">
                <div className="flex flex-col items-center">
                  <div className="font-thin">전체</div>
                  <div>{data.orders.length}</div>
                </div>

                <div className="w-0 h-full border-[1px] border-borderColor opacity-40" />

                <div className="flex flex-col items-center">
                  <div className="font-thin">입찰중</div>
                  <div>
                    {
                      data.orders.filter(
                        (item) =>
                          item.status === BID_STATUS.ONGOING_BID ||
                          item.bidStatus === "입찰 중"
                      ).length
                    }
                  </div>
                </div>

                <div className="w-0 h-full border-[1px] border-borderColor opacity-40" />

                <div className="flex flex-col items-center">
                  <div className="font-thin">완료</div>
                  <div>
                    {
                      data.orders.filter(
                        (item) => item.status === BID_STATUS.COMPLETE_BID
                      ).length
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="w-3/4">
              <Tabel
                rows={["사진", "제품명", "입찰 시간", "입찰가", "상태"]}
                list={data.orders}
              />
            </div>
          </div>

          <div className="w-full flex items-center flex-col gap-4">
            <div className="w-3/4 flex flex-col items-center gap-4">
              <div className="self-start font-bold text-xl">판매 내역</div>
              <div className="bg-[#FAFAFA] py-2 h-[100px] px-10 rounded-md flex items-center justify-around w-full">
                <div className="flex flex-col items-center">
                  <div className="font-thin">전체</div>
                  <div>{data.sales.length}</div>
                </div>

                <div className="w-0 h-full border-[1px] border-borderColor opacity-40" />

                <div className="flex flex-col items-center">
                  <div className="font-thin">입찰중</div>
                  <div>
                    {
                      data.sales.filter(
                        (item) =>
                          item.status === BID_STATUS.ONGOING_BID ||
                          item.bidStatus === "입찰 중"
                      ).length
                    }
                  </div>
                </div>

                <div className="w-0 h-full border-[1px] border-borderColor opacity-40" />
                <div className="flex flex-col items-center">
                  <div className="font-thin">승인 거부</div>
                  <div className=" text-warningColor">
                    {
                      data.sales.filter(
                        (item) =>
                          item.status === BID_STATUS.REJECT_CONFIRM ||
                          item.bidStatus === "승인 거부"
                      ).length
                    }
                  </div>
                </div>
                <div className="w-0 h-full border-[1px] border-borderColor opacity-40" />

                <div className="flex flex-col items-center">
                  <div className="font-thin">완료</div>
                  <div>
                    {
                      data.sales.filter(
                        (item) =>
                          item.status === BID_STATUS.COMPLETE_BID ||
                          item.bidStatus === "완료"
                      ).length
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="w-3/4">
              <Tabel
                rows={["사진", "제품명", "입찰 시간", "상태"]}
                list={data.sales}
              />
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}
