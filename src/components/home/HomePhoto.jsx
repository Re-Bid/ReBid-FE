import { HeartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function HomePhoto({ image, itemName }) {
  const [isCursor, setIsCursor] = useState(false);
  const onMouseEvent = () => {
    setIsCursor((prev) => !prev);
  };
  return (
    <div>
      <div className="w-[200px] h-[150px] ">
        {isCursor ? (
          <div
            onMouseLeave={onMouseEvent}
            className="animate-onMouseEnter bg-black w-[200px] h-[150px] absolute bg-opacity-50 flex flex-col px-2 py-2 justify-between"
          >
            <HeartIcon className="size-4 text-white self-end" />
            <div className="text-white self-start flex flex-col items-start">
              <div className="text-[13px]">{itemName}</div>
              {/* <div className="font-light text-[12px]">시작가 15,000</div> */}
            </div>
          </div>
        ) : null}
        <div onMouseEnter={onMouseEvent} className="h-full bg-neutral-200">
          {image}
        </div>
      </div>
    </div>
  );
}
