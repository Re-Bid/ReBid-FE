import React, { useState } from "react";
import { formatDateTime } from "../../components/detailcompos/DetailContainer";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const comments = [
  {
    imgUrl: "",
    nickName: "주희",
    content: "저 사고 싶어요",
    date: "2024-08-04T03:14",
  },
  {
    imgUrl: "",
    nickName: "주희",
    content: "저 사고 싶어요",
    date: "2024-08-04T03:14",
  },
  {
    imgUrl: "",
    nickName: "주희",
    content: "저 사고 싶어요",
    date: "2024-08-04T03:14",
  },
];

const MaterialBoardDetail = () => {
  const { register, handleSubmit } = useForm();
  const { id } = useParams()
  const [data, setData] = useState()
  const [cookie] = useCookies()

  const onValid = (data) => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/material/${id}`).then(res => {
      setData(res.data.data)
    }).catch(err => console.log(err))
    console.log(data);
  };
  return (
    <div className="py-4 px-10">
      <div className="border-b border-borderColor">
        <p className="font-bold text-3xl">{data?.material.title}</p>
        <div className="flex justify-between items-end p-3 py-5">
          <div className="flex items-center space-x-4">
            <img className="h-14 w-14 bg-bgColor rounded-full" />
            <div>
              <p className="font-bold">{data?.material.nickname}</p>
              <p>날짜</p>
            </div>
          </div>
          <div>댓글 {data?.comments.length}개</div>
        </div>
      </div>
      <div className="py-10 border-b border-borderColor">
        <p className="mx-10">{data?.material.commentNum}</p>
      </div>
      <div className="py-4">
        <div className="mx-10">
          {data?.comments.map((c, index) => (
            <div key={index} className="flex space-x-4 py-4">
              <img
                src={c.profileImage}
                className="h-14 w-14 rounded-full bg-bgColor"
              />
              <div>
                <p className="font-bold">{c.nickname}</p>
                <p className="pt-4 pb-2">{c.content}</p>
                <p className="text-borderColor font-thin">
                  {formatDateTime(c.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onValid)}
        className="mb-10 relative  rounded-lg group-hover textarea textarea-bordered "
      >
        <p className="absolute pt-1 left-4 font-bold">{cookie.nickname}</p>
        <textarea
          {...register("comment")}
          className="mt-10 focus:outline-none w-full "
        />
        <button className="absolute bottom-0 right-3 font-bold text-borderColor">
          등록
        </button>
      </form>
    </div>
  );
};

export default MaterialBoardDetail;
