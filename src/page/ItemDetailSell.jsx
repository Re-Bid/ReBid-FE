import React from 'react';
import { useParams } from 'react-router-dom';
import DetailContainer from '../components/detailcompos/DetailContainer';

const ItemDetailSell = () => {
    const { id } = useParams()
    const data = {
        bidType: "실시간 경매",
        productName: "스타일리시 목제 테이블",
        time: "2024-08-07T16:00",
        startPrice: "15,000원",
        nowHighPrice: "20,000원",
        info: "오래된 나무 팔레트로 만든 이 커피 테이블은 유리 상판과 강철 다리로 러스틱하고 모던한 미학을 결합하였습니다",
    }
    return (
        <div className="py-7">
            <div className="px-10">

                <div className="flex space-x-7 pb-10">

                    <img className="w-[504px] h-[400px]" />
                    <DetailContainer
                        productName={data.productName}
                        info={data.info}
                        time={data.time}
                        startPrice={data.startPrice}
                        isSell
                    />


                </div>
            </div>
            <hr className="border-borderColor" />
            <div className="p-10 space-y-5">
                <div className="font-bold">
                    제품 소개
                </div>
                <div>
                    간략한 소개 어쩌구저쩌구
                    어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구
                    어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구
                    어쩌구저쩌구어쩌구저쩌구

                    어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구
                    어쩌구저쩌구어쩌구저쩌구

                    어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구
                </div>
            </div>

        </div>)
};

export default ItemDetailSell;