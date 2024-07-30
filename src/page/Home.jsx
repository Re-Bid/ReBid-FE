import HomePhoto from "../components/home/HomePhoto";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../style/swiper.css";
import { Navigation } from "swiper/modules";

import "swiper/css/pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import Banner from "../components/home/Banner";

export default function Home() {
  const [data, setData] = useState([]);
  const [endTod, setEndTod] = useState([]);
  const [realTime, setRealTime] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/bids`)
      .then((res) => {
        setData(res.data.data.bids);
        return res.data.data.bids[0];
      })
      .catch((e) => console.log(e));

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/bids/imminent`)
      .then((res) => {
        setEndTod(res.data.data.bids);
      })
      .catch((e) => console.log(e));

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/bids/real-time`)
      .then((res) => {
        setRealTime(res.data.data.bids);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Banner bid={data[0]} />
      <div className="flex flex-col gap-5 py-5">
        <div className="text-2xl px-2">지금 진행중인 경매</div>
        <div className="w-[850px] overflow-visible">
          <Swiper
            spaceBetween={0}
            slidesPerView={4}
            navigation={true}
            modules={[Navigation]}
            className="overflow-visible"
          >
            {realTime.length !== 0 ? (
              realTime.map((e, el) => {
                return (
                  <SwiperSlide key={el}>
                    <HomePhoto image={e.imageUrl} name={e.itemName} />
                  </SwiperSlide>
                );
              })
            ) : (
              <div>No Data</div>
            )}
          </Swiper>
        </div>
      </div>

      <div className="flex flex-col gap-5 py-5">
        <div className="text-2xl px-2">오늘 끝나는 경매</div>
        <div className="w-[850px] overflow-visible">
          <Swiper
            spaceBetween={0}
            slidesPerView={4}
            navigation={true}
            modules={[Navigation]}
            className="overflow-visible"
          >
            {endTod.length !== 0 ? (
              endTod.map((e, el) => {
                return (
                  <SwiperSlide key={el}>
                    <HomePhoto name={e.itemName} image={e.imageUrl} />
                  </SwiperSlide>
                );
              })
            ) : (
              <div>No Data</div>
            )}
          </Swiper>
        </div>
      </div>

      <div className="flex flex-col gap-5 py-5">
        <div className="text-2xl px-2">모든 경매</div>
        <div className="w-[850px] overflow-visible">
          <Swiper
            spaceBetween={0}
            slidesPerView={4}
            navigation={true}
            modules={[Navigation]}
            className="overflow-visible"
          >
            {data.length !== 0 ? (
              data.map((e, el) => {
                return (
                  <SwiperSlide key={el}>
                    <HomePhoto image={e.imageUrl} name={e.itemName} />
                  </SwiperSlide>
                );
              })
            ) : (
              <div>No Data</div>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
