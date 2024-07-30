import React, { useState } from 'react';
import { ArrowPathIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Button from '../Button';
import { formatDateTime } from './DetailContainer';

const totalList = [
    {
        date: "2024-09-29T13:00",
        nickname: "쭈히",
        price: 30000
    },
    {
        date: "2024-09-29T13:00",
        nickname: "쭈히",
        price: 28000
    },
    {
        date: "2024-09-29T13:00",
        nickname: "쭈히",
        price: 25000
    },

]

const DetailBidConfirm = ({ startPrice, setAgreeClickFunc }) => {
    const [bidMoney, setBidMoney] = useState(startPrice)
    const [loading, setLoading] = useState(false)
    const [isTotalBid, setIsTotalBid] = useState(true)

    function generatePriceList(startPrice) {
        let priceList = [];
        let increment = startPrice <= 100000 ? 1000 : 10000;

        for (let i = 0; i < 10; i++) {
            priceList.push(startPrice + (i * increment));
        }

        return priceList;
    }

    return (
        <div>
            <div className='bg-bgColor text-center py-3 space-y-2'>
                <p className='text-xs font-thin'>
                    남은 시간
                </p>
                <p className='font-bold'>
                    09일 16시간 08분
                </p>
            </div>
            <div>
                <div className=' flex justify-center space-x-4 text-xs font-thin py-3'>
                    <p className={`${isTotalBid ? "font-normal underline" : " "}`} onClick={() => setIsTotalBid(true)}>
                        전체({totalList.length})
                    </p>
                    <p className={`${!isTotalBid ? "font-normal underline" : " "}`} onClick={() => setIsTotalBid(false)}>내 응찰(1)</p>
                </div>
                <div className='h-40 overflow-y-scroll'>
                    {isTotalBid ? totalList.map((item, index) =>
                        <div key={index} className='py-2 border-b border-borderColor'>
                            <p className='font-thin text-xs'>
                                {formatDateTime(item.date)}
                            </p>
                            <div className='flex justify-between px-4'>
                                <p className='pl-4'>
                                    {item.nickname}
                                </p>
                                <div>
                                    {item.price}
                                </div>
                            </div>

                        </div>
                    ) : null}
                </div>

            </div>
            <div className='grid grid-cols-2 pt-10 items-center gap-2 pb-7'>
                <div>
                    시작가
                </div>
                <div>
                    {startPrice}원
                </div>
                <div>
                    현재 최고 응찰가
                </div>
                <div className='text-warningColor flex items-center'>
                    30,000원
                    <ArrowPathIcon className={`size-6 ml-2 cursor-pointer ${loading ? "animate-spin" : ""}`} onClick={() => {
                        setLoading(true)
                        setTimeout(() => {
                            setLoading(false);
                        }, 1000);
                    }} />
                </div>
                <div>
                    응찰가
                </div>
                <div className="dropdown dropdown-top ">
                    <div tabIndex={0} role="button" className="border border-borderColor p-1 relative">
                        {bidMoney}
                        <p className='absolute right-1 top-1 '>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>

                        </p>
                    </div>
                    <ul tabIndex={0} className="dropdown-content  menu block bg-base-100 rounded-box z-[1] w-52 p-2 m-1 shadow h-40 overflow-y-scroll">
                        {generatePriceList(startPrice).map((price) =>
                            <li onClick={() => setBidMoney(price)} key={price}><a>{price}</a></li>
                        )}
                    </ul>
                </div>

            </div>
            <div onClick={() => setAgreeClickFunc(prev => !prev)}>
                <Button text="응찰하기" />
            </div>

        </div>
    );
};

export default DetailBidConfirm;