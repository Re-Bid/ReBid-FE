import { useEffect } from "react";
import ListCard from "../components/ListCard";

export default function LikeLists() {
  const arr = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="self-start font-bold text-3xl pt-10 px-10 pb-3">찜ෆ</div>
      <div className="grid grid-cols-4">
        {arr.map((e, i) => {
          return (
            <div className="mb-10 mx-2" key={i}>
              <ListCard />
            </div>
          );
        })}
      </div>
    </div>
  );
}
