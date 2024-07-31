import { useEffect, useState } from "react";
import Table from "../../components/Table";
import axios from "axios";

const rowWaitList = ["사진", "제품명", "시작가", "상태"];
const rowCompleteList = ["사진", "제품명", "낙찰가", "상태"];

const waitList = [
  {
    id: 0,
    imgUrl: "",
    productName: "제품명",
    startPrice: 20000,
    status: "승인 대기",
  },
  {
    id: 1,
    imgUrl: "",
    productName: "제품명",
    startPrice: 20000,
    status: "승인 대기",
  },
  {
    id: 2,
    imgUrl: "",
    productName: "제품명",
    startPrice: 20000,
    status: "승인 대기",
  },
  {
    id: 3,
    imgUrl: "",
    productName: "제품명",
    startPrice: 20000,
    status: "승인 대기",
  },
];

const completeList = [
  {
    id: 0,
    imgUrl: "",
    productName: "제품명",
    startPrice: 20000,
    status: "승인 완료",
  },
];

export default function AdminList() {
  const [pendingData, setPendingData] = useState([]);
  const [confirmData, setConfirmData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/admin/bids?status=${"pending"}`, {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6NywiaWF0IjoxNzIyNDQ2NTgyLCJleHAiOjE3MjI0NjQ1ODJ9.7OXdUqGJ6AKcXfNQp2B2h0KCR_JhUA3HfL45wmf-PGk"}`,
        },
      })
      .then((res) => {
        console.log(res);
        setPendingData(res.data.data.bids);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/admin/bids?status=${"confirm"}`, {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6NywiaWF0IjoxNzIyNDQ2NTgyLCJleHAiOjE3MjI0NjQ1ODJ9.7OXdUqGJ6AKcXfNQp2B2h0KCR_JhUA3HfL45wmf-PGk"}`,
        },
      })
      .then((res) => {
        console.log(res);
        setConfirmData(res.data.data.bids);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="w-full  px-10 ">
      <div role="tablist" className="tabs tabs-lifted ">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="경매 대기"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <Table rows={rowWaitList} list={pendingData} isAdmin={true} />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="경매 완료"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <Table rows={rowCompleteList} list={confirmData} isAdmin={true} />
        </div>
      </div>
    </div>
  );
}
