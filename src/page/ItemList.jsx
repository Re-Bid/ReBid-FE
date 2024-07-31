import { useEffect, useState } from "react";
import ListCard from "../components/ListCard.jsx";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { nowNav } from "../atom.js";
import axios from "axios";
import { useCookies } from "react-cookie";

const CategoryEnum = Object.freeze({
  bag: { label: "가방", value: "BAG" },
  keyring: { label: "키링", value: "KEYRING" },
  pouch: { label: "파우치", value: "POUCH" },
  wallet: { label: "지갑", value: "WALLET" },
  else: { label: "etc", value: "ETC" },
});

export default function ItemList() {
  const { category } = useParams();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [itemLists, setItemLists] = useState([]);
  const [cookie] = useCookies();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/bids/category?name=${CategoryEnum[category].value}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log("여긴 itemList", res);
        setItemLists(res.data.data.bids);
      })
      .catch((err) => console.log(err));
  }, [category]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="self-start font-bold text-3xl pt-10 px-10">
        {CategoryEnum[category].label}
      </div>
      <div className="grid grid-cols-4">
        {itemLists?.map((e, i) => (
          <div className="my-10 mx-2" key={i}>
            <ListCard {...e} />
          </div>
        ))}
      </div>
    </div>
  );
}
