import { CameraIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sell() {
  const [images, setImages] = useState([]);
  const [imageCnt, setImageCnt] = useState(0);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0);
  const [shortDisc, setShortDisc] = useState("");
  const [detail, setDetail] = useState("");
  const [type, setType] = useState("realTime");
  const [tag, setTag] = useState([]);
  const [convertUrl, setConvertedUrl] = useState([]);

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    let selectedCategory = "BAG";
    if (e.target[4].checked) {
      selectedCategory = "KEYRING";
    } else if (e.target[5].checked) {
      selectedCategory = "POUCH";
    } else if (e.target[6].checked) {
      selectedCategory = "WALLET";
    } else if (e.target[7].checked) {
      selectedCategory = "ETC";
    }
    const sellData = {
      itemName: e.target[1].value,
      category: selectedCategory,
      startPrice: parseInt(e.target[8].value),
      itemIntro: e.target[9].value,
      itemDescription: e.target[10].value,
      imageUrls: convertUrl,
      startDate: null,
      endDate: null,
    };
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/bids/sell`, sellData,)
      .then((res) => {
        alert("등록 되었습니다.")
        navigate("/")

      })
      .catch((e) => console.log(e));
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

  const fileUrlConverter = async (data) => {
    let temp = [];
    let err = null;
    try {
      for (let i = 0; i < data.target.files.length; i++) {
        const formData = new FormData();
        const imageUrl = URL.createObjectURL(data.target.files[i]);
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const imageFile = new File([blob], "project_image.jpg", {
          type: "image/jpeg",
        });
        formData.append("image", imageFile);

        const res = await axios({
          method: "post",
          url: `${process.env.REACT_APP_BASE_URL}/imageTest`,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
          transformRequest: (data, headers) => {
            return data;
          },
        });
        temp.push(res.data.data);
      }
    } catch (e) {
      err = e;
      console.log(e);
    } finally {
      if (!err) {
        return temp;
      }
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
              onChange={async (e) => {
                const res = await fileUrlConverter(e);
                if (res) {
                  setConvertedUrl((prev) => [...prev, ...res]);
                  if (e.target.files.length === res.length) {
                    onFileUpload(e);
                  }
                } else {
                  alert(
                    "파일의 용량이나 형식을 확인해주세요. 10MB이상 이거나 이미지 파일이 아닐 경우 문제가 발생합니다."
                  );
                }
              }}
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
