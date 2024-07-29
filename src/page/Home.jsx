import HomePhoto from "../components/home/HomePhoto";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../style/swiper.css";
import { Navigation, Pagination } from "swiper/modules";
import { HeartIcon } from "@heroicons/react/24/outline";

import "swiper/css/pagination";

export default function Home() {
  const auctionArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <div className="">
      <div className="h-[350px] grid grid-cols-2">
        <div className="h-full text-white bg-[#88939A] px-14 py-10 flex flex-col justify-around font-light">
          <div className="font-bold text-xl">
            7/23(화) 오후 6시부터 응찰 오픈
          </div>
          <div>
            <div className="font-bold">프리뷰 일정</div>
            <div>온라인: 7/23 (화) 10am 부터 마감전, 24시간 항시</div>
          </div>
          <div>
            7/29 (월) 4pm 부터,
            <br /> 홈페이지에서 5분 간격 10작품씩 순차 마감
          </div>
        </div>
        <div className="bg-neutral-300">사진</div>
      </div>

      <div className="flex flex-col gap-5 py-5">
        <div className="text-2xl px-2">지금 진행중인 경매</div>
        <div className="w-[1024px]">
          <Swiper
            spaceBetween={30}
            slidesPerView={4}
            navigation={true}
            modules={[Navigation]}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {auctionArray.map((e, el) => {
              return (
                <SwiperSlide>
                  <HomePhoto />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      <div className="flex flex-col gap-5 py-5">
        <div className="text-2xl px-2">오늘 끝나는 경매</div>
        <div className="w-[1024px]">
          <Swiper
            spaceBetween={30}
            slidesPerView={4}
            navigation={true}
            modules={[Navigation]}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {auctionArray.map((e, el) => {
              return (
                <SwiperSlide>
                  <HomePhoto />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      <div className="flex flex-col gap-5 py-5">
        <div className="text-2xl px-2">모든 경매</div>
        <div className="w-[1024px]">
          <Swiper
            spaceBetween={30}
            slidesPerView={4}
            navigation={true}
            modules={[Navigation]}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {auctionArray.map((e, el) => {
              return (
                <SwiperSlide>
                  <HomePhoto />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
