import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailContainer from "../components/detailcompos/DetailContainer";
import axios from "axios";
import ChatBot from "../components/ChatBot";
import { useCookies } from "react-cookie";
import ListCard from "../components/ListCard";

export default function ItemDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [heartClick, setHeartClick] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [data, setData] = useState();
  const [cookie] = useCookies()

  const [aiData, setAiData] = useState([])

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

    axios.get(`${process.env.REACT_APP_BASE_URL}/bids/personalRecommend`, {
      headers: { Authorization: `Bearer ${cookie.accessToken}` }
    }).then(res => {
      console.log(res)
      setAiData(res.data.data.bids)
    }).catch(err => console.log(err))
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
          <div className="p-5 space-y-5">
            <div className="font-bold">제품 소개</div>
            <div className="whitespace-pre-wrap">{data?.itemDescription}</div>
          </div>
          <hr className="border-borderColor" />
          <div className="p-5">
            <div className="font-bold pb-4">추천 제품</div>
            <div className="grid grid-cols-4 gap-4">
              {aiData.map((a, i) => <ListCard {...a} />)}
            </div>


          </div>
        </div>
      )}
      <ChatBot bidId={data?.bidId} />
    </div>
  );
}
