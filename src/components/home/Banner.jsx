import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDateTime } from "../detailcompos/DetailContainer";

const Banner = ({ bid }) => {
  const [banner, setBanner] = useState({});
  useEffect(() => {
    if (bid) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/bids/${bid.bidId}`)
        .then((e) => setBanner(e.data.data));
    }
  }, [bid]);
  return (
    <div className="w-full">
      <div className="h-[350px] w-full grid grid-cols-2">
        <div className="h-full text-white bg-[#88939A] px-14 py-10 flex flex-col justify-around font-light">
          <div className="font-bold text-xl">
            {banner.endDate ? (
              formatDateTime(banner.endDate)
            ) : (
              <div>no Data</div>
            )}
            에 경매 마감
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-xl font-medium">
              {banner.itemName ? banner.itemName : <div>no Data</div>}
            </div>
            <div className="font-thin text-lg">
              {banner.itemIntro ? banner.itemIntro : <div>no Data</div>}
            </div>
            <div className="font-thin text-xs">
              ₩{banner.startPrice ? banner.startPrice : <div>no Data</div>}
              부터~
            </div>
          </div>
        </div>
        <div className="bg-neutral-300">
          {banner.imagesUrls ? banner.imageUrls[0] : <div>no Data</div>}
        </div>
      </div>
    </div>
  );
};

export default Banner;
