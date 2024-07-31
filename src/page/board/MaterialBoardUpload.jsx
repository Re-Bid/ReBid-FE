import { CameraIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Button from "../../components/Button";
import axios from "axios";
import { useForm } from "react-hook-form";

const MaterialBoardUpload = () => {
  const { register, handleSubmit } = useForm();
  const [images, setImages] = useState("");
  const [convertedUrl, setConvertedUrl] = useState(null);
  const onFileUpload = (e) => {
    let reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImage = reader.result;
      setImages(resultImage);
    };
  };

  const onSubmit = (e) => {
    let data = {
      imageUrl: convertedUrl,
      title: e.title,
      description: e.description,
    };
    try {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/material`, data, {
          headers: {
            Authorization: `Bearer ${cookie.accessToken}`,
          },
        })
        .then((res) => {
          console.log(res);
          alert("등록 되었습니다.");
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const fileUrlConverter = async (data) => {
    let temp = [];
    let err = null;
    try {
      const formData = new FormData();
      const imageUrl = URL.createObjectURL(data.target.files[0]);
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
    <div className="px-10 py-5 w-full flex flex-col items-center justify-center gap-5">
      <div className="text-xl pb-2 w-3/4 text-left">재료 판매하기</div>
      <div className="border-[1px] w-3/4 border-black" />

      <form onSubmit={handleSubmit(onSubmit)} className="w-3/4 gap-5">
        <div className="flex flex-col w-full">
          <div className="flex">
            <div>상품 이미지</div>
            <input
              onChange={async (e) => {
                const res = await fileUrlConverter(e);
                if (res) {
                  setConvertedUrl(res);
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
            {images ? (
              <img
                src={images}
                alt="uploaded"
                className="size-24 border-bgColor border-2 rounded-md"
              />
            ) : null}
          </div>
        </div>

        <div className="w-full">
          <div>제목</div>
          <input
            {...register("title")}
            type="text"
            name="title"
            placeholder="제목을 입력해주세요."
            className="inputText w-full"
          />
        </div>

        <div className="w-full">
          <div>설명</div>
          <textarea
            {...register("description")}
            type="text"
            name="description"
            placeholder="설명을 입력해주세요."
            className="inputText w-full resize-none h-[200px] mb-5"
          />
        </div>
        <Button text={"판매 게시판에 등록하기"} isGray={false} />
      </form>
    </div>
  );
};

export default MaterialBoardUpload;
