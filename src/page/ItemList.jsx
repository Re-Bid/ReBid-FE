import { useEffect, useState } from "react";
import ListCard from "../components/ListCard.jsx";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { nowNav } from "../atom.js";

export default function ItemList() {
  const category = useRecoilValue(nowNav);
  const [name, setName] = useState("");
  useEffect(() => {
    if (category === "bag") {
      setName("가방");
    } else if (category === "keyring") {
      setName("키링");
    } else if (category === "pouch") {
      setName("파우치");
    } else if (category === "wallet") {
      setName("지갑");
    } else if (category === "else") {
      setName("etc");
    } else {
      setName("");
    }
  }, [category]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="self-start font-bold text-3xl pt-10 px-10">{name}</div>
      <div className="grid grid-cols-4">
        {Array(20).fill(2).map((e, i) => {
          return (
            <div className="my-10 mx-2" key={i}>
              <ListCard />
            </div>
          );
        })}
      </div>
    </div>
  );
}
