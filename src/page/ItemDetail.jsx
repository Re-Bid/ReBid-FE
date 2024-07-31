import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailContainer from "../components/detailcompos/DetailContainer";
import axios from "axios";
import ChatBot from "../components/ChatBot";

export default function ItemDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [heartClick, setHeartClick] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/bids/${id}`)
      .then((res) => {
        console.log(res);

        setData(res.data.data);
        setImgUrl(res.data.data.imageUrls[0]);
        setLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {!loading ? (
        <div className="w-full flex justify-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <div className="py-7">
          <div className="px-10">
            <div className="flex space-x-7 pb-10">
              <div>
                <img className="w-[504px] h-[400px]" src={imgUrl} />
                <div className="flex space-x-4 py-3">
                  {data.imageUrls.map((item, index) => (
                    <img
                      onClick={() => setImgUrl(item)}
                      src={item}
                      className="h-16 w-16"
                    />
                  ))}
                </div>
              </div>

              <DetailContainer
                bidId={data.bidId}
                productName={data.itemName}
                time={data.endDate}
                startPrice={data.startPrice}
                nowHighPrice={data.currentPrice}
                info={data.itemIntro}
                isHeart={data.isHeart}
                bidType={data.bidType}
              />
            </div>
          </div>
          <hr className="border-borderColor" />
          <div className="p-10 space-y-5">
            <div className="font-bold">제품 소개</div>
            <div className="whitespace-pre-wrap">{data?.itemDescription}</div>
          </div>
        </div>
      )}
      <ChatBot bidId={data?.bidId} />
    </div>
  );
}
