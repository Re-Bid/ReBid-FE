import { useParams } from "react-router-dom";
import DetailContainer from "../../components/detailcompos/DetailContainer";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";

export default function AdminDetail() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/admin/bids/${id}`, {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6NywiaWF0IjoxNzIyNDQ2NTgyLCJleHAiOjE3MjI0NjQ1ODJ9.7OXdUqGJ6AKcXfNQp2B2h0KCR_JhUA3HfL45wmf-PGk"}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setImgUrl(res.data.data.imageUrl[0]);
        setLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Fragment>
      {!loading ? (
        <div className="w-full flex justify-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <div>
          <div className="py-7">
            <div className="px-10">
              <div className="flex space-x-7 pb-10">
                <div>
                  <img className="w-[504px] h-[400px]" src={imgUrl} />
                  <div className="flex space-x-4 py-3">
                    {data?.imageUrl.map((item, index) => (
                      <img
                        onClick={() => setImgUrl(item)}
                        src={item}
                        className="h-16 w-16"
                      />
                    ))}
                  </div>
                </div>
                <DetailContainer
                  bidId={data?.bidId}
                  productName={data?.itemName}
                  startPrice={data?.startPrice}
                  info={data?.itemIntro}
                  isAdmin
                />
              </div>
            </div>
            <hr className="border-borderColor" />
            <div className="p-10 space-y-5">
              <div className="font-bold">제품 소개</div>
              <div>{data?.itemDescription}</div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
