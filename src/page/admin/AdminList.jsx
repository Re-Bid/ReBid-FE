import Table from "../../components/Table";

const rowWaitList = ["사진", "제품명", "시작가", "상태"]
const rowCompleteList = ["사진", "제품명", "낙찰가", "상태"]

const waitList = [
  {
    imgUrl: "",
    productName: "제품명",
    startPrice: 20000,
    status: "승인 대기"
  },
  {
    imgUrl: "",
    productName: "제품명",
    startPrice: 20000,
    status: "승인 대기"
  },
  {
    imgUrl: "",
    productName: "제품명",
    startPrice: 20000,
    status: "승인 대기"
  },
  {
    imgUrl: "",
    productName: "제품명",
    startPrice: 20000,
    status: "승인 대기"
  },
]

const completeList = [
  {
    imgUrl: "",
    productName: "제품명",
    startPrice: 20000,
    status: "승인 완료"
  },
]

export default function AdminList() {
  return <div className="w-full  px-10 ">


    <div role="tablist" className="tabs tabs-lifted ">
      <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="경매 대기" />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <Table rows={rowWaitList} list={waitList} />

      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab"
        aria-label="경매 완료"
        defaultChecked />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">

        <Table rows={rowCompleteList} list={completeList} />
      </div>

    </div>

  </div>;
}
