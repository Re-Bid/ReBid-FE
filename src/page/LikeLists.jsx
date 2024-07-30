import { useEffect, useState } from "react";
import ListCard from "../components/ListCard";
import axios from "axios";

export default function LikeLists() {
  const [data, setData] = useState()
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/bids/heart`, {
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MSwiaWF0IjoxNzIyMzc0MTY3LCJleHAiOjE3MjIzOTIxNjd9.rT_apRgdCesR_5gBII_JmkqKoER9L7ELpAA5U0-JRN8"}`
      }
    }).then(res => {
      setData(res.data.data.bids)
    }).catch(err => console.log(err))
  }, [])
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="self-start font-bold text-3xl pt-10 px-10 pb-3">찜ෆ</div>
      <div className="grid grid-cols-4">
        {data?.map((item, i) => {
          return (
            <div className="mb-10 mx-2" key={i}>
              <ListCard {...item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
