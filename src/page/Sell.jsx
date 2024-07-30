import { CameraIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Button from "../components/Button";

export default function Sell() {
  const [images, setImages] = useState([]);
  const [imageCnt, setImageCnt] = useState(0);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0);
  const [shortDisc, setShortDisc] = useState("");
  const [detail, setDetail] = useState("");
  const [type, setType] = useState("realTime");
  const [tag, setTag] = useState([]);
  const onSubmit = (e) => {
    e.preventDefault();
    setItemName(e.target[1].value);
    setPrice(e.target[11].value);
    setShortDisc(e.target[12].value);
    setDetail(e.target[13].value);
    if (e.target[4].checked) {
      setType("period");
    }
    if (e.target[6].checked) {
      setTag((prev) => [...prev, e.target[6].id]);
    }
    if (e.target[7].checked) {
      setTag((prev) => [...prev, e.target[7].id]);
    }
    if (e.target[8].checked) {
      setTag((prev) => [...prev, e.target[8].id]);
    }
    if (e.target[9].checked) {
      setTag((prev) => [...prev, e.target[9].id]);
    }
    if (e.target[10].checked) {
      setTag((prev) => [...prev, e.target[10].id]);
    }
  };

  const onFileUpload = (e) => {
    if (images.length + e.target.files.length <= 5) {
      for (let i = 0; i < e.target.files.length; i++) {
        let reader = new FileReader();
        if (e.target.files[i]) {
          reader.readAsDataURL(e.target.files[i]);
        }
        reader.onloadend = () => {
          const resultImage = reader.result;
          setImages((prev) => [...prev, resultImage]);
        };
        setImageCnt((prev) => prev + 1);
      }
    } else {
      alert("사진은 최대 5개까지 입력 가능합니다.");
    }
  };

  return (
    <div className="pb-10">
      <div>
        <div className="text-2xl py-3">상품정보</div>
        <div className="h-0 w-full border-[1px] border-black"></div>
      </div>

      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center *:w-[1000px]"
      >
        <div className="grid grid-cols-[2fr_5fr] py-5 border-borderColor *:my-3">
          <div className="flex flex-col">
            <div>
              상품 이미지
              <span className="text-neutral-300 text-[13px]">
                ({imageCnt}/5)
              </span>
            </div>
            <input
              onChange={onFileUpload}
              type="file"
              name="photo"
              id="photo"
              className="opacity-0"
              accept="image/*"
              required
              multiple
            />
          </div>
          <div className="flex gap-5">
            <label
              htmlFor="photo"
              className="bg-bgColor size-24 flex flex-col items-center justify-center gap-2 rounded-md *:opacity-50 py-2 px-4 hover:opacity-80 cursor-pointer"
            >
              <CameraIcon className="size-6" />
              <div className="text-[13px]">이미지 등록</div>
            </label>
            {images.map((e, i) => (
              <img
                src={e}
                alt="uploaded"
                key={i}
                className="size-24 border-bgColor border-2 rounded-md"
              />
            ))}
          </div>

          <div>상품명</div>
          <input
            type="text"
            name="name"
            className="inputText"
            required
            placeholder="상품명을 입력해주세요"
          />

          <div>경매 유형</div>
          <fieldset className="flex gap-4 items-center">
            <label htmlFor="realTime" className="flex items-center gap-1">
              <input
                type="radio"
                name="type"
                id="realTime"
                className="checkbox"
                defaultChecked
                readOnly
              />
              실시간 경매
            </label>
            <label htmlFor="period" className="flex items-center gap-1">
              <input
                type="radio"
                name="type"
                id="period"
                className="checkbox"
                readOnly
              />
              기간 경매
            </label>
          </fieldset>

          <div>상품 유형</div>
          <fieldset className="flex gap-4 items-center">
            <label htmlFor="bag" className="flex items-center gap-1">
              <input
                type="radio"
                name="item"
                id="bag"
                className="checkbox"
                defaultChecked
                readOnly
              />
              가방
            </label>
            <label htmlFor="keyring" className="flex items-center gap-1">
              <input
                type="radio"
                name="item"
                id="keyring"
                className="checkbox"
                readOnly
              />
              키링
            </label>
            <label htmlFor="pouch" className="flex items-center gap-1">
              <input
                type="radio"
                name="item"
                id="pouch"
                className="checkbox"
                readOnly
              />
              파우치
            </label>
            <label htmlFor="wallet" className="flex items-center gap-1">
              <input
                type="radio"
                name="item"
                id="wallet"
                className="checkbox"
                readOnly
              />
              지갑
            </label>
            <label htmlFor="etc" className="flex items-center gap-1">
              <input
                type="radio"
                name="item"
                id="etc"
                className="checkbox"
                readOnly
              />
              etc
            </label>
          </fieldset>

          <div>시작 가격</div>
          <input
            required
            type="number"
            name="startPrice"
            className="inputText"
            placeholder="시작 가격을 입력해주세요."
          />

          <div>제품 소개</div>
          <input
            required
            type="text"
            name="shortExplain"
            className="inputText"
            placeholder="제품에 대한 간략한 소개를 적어주세요."
          />

          <div>설명</div>
          <textarea
            required
            type="text"
            name="detail"
            className="resize-none inputText h-[250px] py-2"
            placeholder="제품에 대한 간략한 소개를 적어주세요."
          />
        </div>

        <input
          type="submit"
          value="제품 등록 신청하기"
          className="btn bg-black text-white"
        />
      </form>
    </div>
  );
}
