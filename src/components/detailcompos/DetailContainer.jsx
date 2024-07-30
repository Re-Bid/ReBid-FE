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


export function formatDateTime(targetDateString) {
    // 입력된 날짜와 시간을 파싱
    const date = new Date(targetDateString);

    // 월, 일, 시간, 분 추출
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더함
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    // 원하는 형식으로 변환
    return `${month}월 ${day}일 ${hours}:${minutes}`;
}


const DetailContainer = ({ bidId, time, productName, startPrice, nowHighPrice, info, bidType, isAdmin, isSell, isHeart }) => {

    const [loading, setLoading] = useState(false)
    const [heartClick, setHeartClick] = useState(isHeart)
    const [agreeClick, setAgreeClick] = useState(false)

    const [bidPrice, setBidPrice] = useRecoilState(bidPriceState)

    const navigate = useNavigate()




    function getTimeRemaining(targetDateString) {
        const targetDate = new Date(targetDateString);
        const currentTime = new Date();

        const timeDifference = targetDate - currentTime;

        const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursRemaining = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesRemaining = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        return `${daysRemaining}일 ${hoursRemaining}시간 ${minutesRemaining}분`;
    }



    return (
        <div className="flex-1 ">
            {bidType === "RESERVATION" ?
                <div className="text-end pb-3">
                    <div>
                        남은 시간
                    </div>
                    <div className="font-bold">
                        {getTimeRemaining(time)}
                    </div>
                </div> : null}

            <div className="flex justify-between items-center">
                <div className="text-3xl">{productName}</div>
                {heartClick ?
                    <SolidHeartIcon
                        onClick={() => { setHeartClick(prev => !prev) }}
                        className=" size-6 cursor-pointer  bg-white rounded-full" /> :
                    <OutlineHeartIcon
                        onClick={() => { setHeartClick(prev => !prev) }}
                        className=" size-6 cursor-pointer  bg-white rounded-full" />}
            </div>
            <div className="whitespace-pre-line py-3">
                {info}
            </div>
            <hr className="border-borderColor" />
            <div className="py-4 grid grid-cols-2 gap-4 border-b border-borderColor">
                <div> 시작가</div>
                <div>{startPrice}</div>
                {isSell ?
                    <Fragment>
                        <div>낙찰가</div>
                        <div className="text-warningColor">30,000원</div>
                    </Fragment>
                    :
                    isAdmin ? null :

                        bidType === "RESERVATION" ?
                            <Fragment>
                                <div>현재 최고 응찰가</div>
                                <div className="text-warningColor flex items-center space-x-2">
                                    <div>{nowHighPrice}</div>
                                    <ArrowPathIcon className={`size-6 cursor-pointer ${loading ? "animate-spin" : ""}`} onClick={() => {
                                        setLoading(true)
                                        setTimeout(() => {
                                            setLoading(false);
                                        }, 1000);
                                    }} />
                                </div>
                            </Fragment> : null
                }

            </div>
            <div className="space-y-4 py-4 ">
                {isAdmin ?
                    <Fragment>
                        <div className="w-full" onClick={() => document.getElementById('deny').showModal()}>
                            <Button text="반려하기" isGray />
                            <DetailAdminModal id={"deny"} title="반려하기" bidId={bidId} />
                        </div>
                        <div className="w-full" onClick={() => document.getElementById('approve').showModal()}>
                            <Button text="승인하기" />
                            <DetailAdminModal id={'approve'} bidType={bidType} bidId={bidId} />
                        </div>


                    </Fragment>
                    :
                    <Fragment>
                        <div className="bg-bgColor p-3 rounded-md text-center">
                            {isSell ? "🎊축하합니다! 낙찰되셨습니다!🎊" : <Fragment>

                                {bidType === "RESERVATION" ? "마감시간 :" : "경매시간 : "}

                                <span className="text-warningColor">
                                    {formatDateTime(time)}</span>
                            </Fragment>}

                        </div>
                        {isSell ?
                            <div className="w-full btn bg-green-400 hover:bg-green-400">
                                네이버로 결제하기
                            </div>
                            :
                            <Fragment>
                                <div onClick={() => document.getElementById('응찰하기').showModal()}>
                                    <Button text="응찰하기" />
                                </div>

                                <DetailModal
                                    title={"응찰 내역"}
                                    child={
                                        < DetailBidConfirm startPrice={startPrice} nowHighPrice={nowHighPrice} remainingTime={getTimeRemaining(time)} setBidPrice={setBidPrice} bidId={bidId} />}
                                    id={'응찰하기'} />


                            </Fragment>
                        }




                    </Fragment>

                }

            </div>
        </div>
    );
};

export default DetailContainer;