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

const warningText = [
    "낙찰 후 취소하고자 하는 경우, 낙찰자는 낙찰철회비로 낙찰가의 30%에 해당하는 금액을 납부하여야 하므로 신중하게 응찰하시기 바랍니다.",
    "응찰 시 유의사항 경매에 참여하기 전에 상품의 상세 정보를 반드시 확인하시기 바랍니다. 제품 상태, 설명, 사진 등을 꼼꼼히 검토해 주세요.",
    "낙찰 후 24시간 이내에 결제를 완료해 주셔야 합니다. 기한 내에 결제가 이루어지지 않을 경우 낙찰이 자동으로 취소될 수 있습니다.",
    "부정한 방법으로 경매에 참여할 경우, 해당 계정은 영구적으로 이용이 제한될 수 있습니다. 정직한 참여를 부탁드립니다."
]

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


const DetailContainer = ({ time, productName, startPrice, nowHighPrice, info, bidType, isAdmin, isSell }) => {

    const [loading, setLoading] = useState(false)
    const [heartClick, setHeartClick] = useState(false)
    const [agreeClick, setAgreeClick] = useState(false)

    const navigate = useNavigate()

    const notAgreeChild =
        <div>
            <div className="py-4 border-b border-borderColor">
                {warningText.map((text, i) =>
                    <div key={i} className="pb-5 text-sm">∙ {text}</div>
                )}
            </div>
            <div className="text-center py-7 text-lg font-bold">온라인 경매 및 위 응찰 유의사항을 확인하였으며,<br /> 동의하므로 응찰합니다</div>

            <div onClick={() => {
                alert("응찰 되었습니다")
                navigate("/")
            }}>
                <Button text="동의 및 응찰" />
            </div>



        </div>


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
                {isSell ?
                    <Fragment>
                        <div>낙찰가</div>
                        <div className="text-warningColor">30,000원</div>
                    </Fragment>
                    :
                    isAdmin ? <Fragment>
                        <div>경매 유형</div>
                        <div>{bidType}</div>
                    </Fragment> :

                        bidType === "기간 경매" ?
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
                            <DetailAdminModal id={"deny"} title="반려하기" />
                        </div>
                        <div className="w-full" onClick={() => document.getElementById('approve').showModal()}>
                            <Button text="승인하기" />
                            <DetailAdminModal id={'approve'} bidType={bidType} />
                        </div>


                    </Fragment>
                    :
                    <Fragment>
                        <div className="bg-bgColor p-3 rounded-md text-center">
                            {isSell ? "🎊축하합니다! 낙찰되셨습니다!🎊" : <Fragment>

                                {bidType === "기간 경매" ? "마감시간 :" : "경매시간 : "}

                                <span className="text-warningColor">
                                    {formatDateTime(time)}</span>
                            </Fragment>}

                        </div>
                        <div className="w-full btn bg-green-400 hover:bg-green-400">
                            네이버로 결제하기
                        </div>

                        <DetailModal title={agreeClick ? "응찰 내역" : "온라인 입찰 주의사항"} child={agreeClick ? notAgreeChild : < DetailBidConfirm startPrice={15000} setAgreeClickFunc={setAgreeClick} />} id={'my_modal_3'} />

                    </Fragment>

                }

            </div>
        </div>
    );
};

export default DetailContainer;