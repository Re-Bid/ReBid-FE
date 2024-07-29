import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import Button from "./Button";


const DetailContainer = ({ time, productName, startPrice, nowHighPrice, info, bidType }) => {

    const [loading, setLoading] = useState(false)
    const [heartClick, setHeartClick] = useState(false)

    function getTimeRemaining(targetDateString) {
        const targetDate = new Date(targetDateString);
        const currentTime = new Date();

        const timeDifference = targetDate - currentTime;

        const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursRemaining = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesRemaining = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        return `${daysRemaining}일 ${hoursRemaining}시간 ${minutesRemaining}분`;
    }

    function formatDateTime(inputString) {
        // 입력된 날짜와 시간을 파싱
        const date = new Date(inputString);

        // 월, 일, 시간, 분 추출
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더함
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);

        // 원하는 형식으로 변환
        return `${month}월 ${day}일 ${hours}:${minutes}`;
    }


    return (
        <div className="flex-1 ">
            {bidType === "기간 경매" ? <div className="text-end pb-3">
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
                {bidType === "기간 경매" ?
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
                    </Fragment>
                    :
                    <div className="h-20" />
                }

            </div>
            <div className="flex flex-col space-y-4 py-4">
                <div className="bg-bgColor p-3 rounded-md text-center">
                    {bidType === "기간 경매" ? "마감시간 :" : "경매시간 : "}

                    <span className="text-warningColor">
                        {formatDateTime(time)}</span>
                </div>
                <Button text="응찰하기" />
            </div>
        </div>
    );
};

export default DetailContainer;