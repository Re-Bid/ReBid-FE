import React, { useState } from "react";
import himan from "../asset/himan.png";
import { useForm } from "react-hook-form";
import Button from "./Button";
import axios from "axios";
import { useCookies } from "react-cookie";

const ChatBot = ({ bidId }) => {
  const { register, handleSubmit, reset } = useForm();
  const [userChats, setUserChats] = useState([]);

  const [cookie] = useCookies();

  const onClick = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/bids/${bidId}/AiRecommend`, {
        headers: {
          Authorization: `Bearer ${cookie.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="fixed bottom-4 right-20 z-20">
      <div className="dropdown dropdown-top dropdown-end">
        <img
          src={himan}
          tabIndex={0}
          role="button"
          className="btn-lg rounded-full px-2 py-2 m-1 shadow-lg w-20 h-20"
        />
        <div
          tabIndex={0}
          className="dropdown-content menu  rounded-box z-[1] w-[400px] p-4 h-[600px] shadow-lg border flex flex-col bg-white"
        >
          <div className=" flex-1">
            <div className="h-[500px] overflow-y-scroll">
              <div className="chat chat-start items-end">
                <img src={himan} className="h-10 w-10 rounded-full border" />
                <div className="chat-bubble">
                  안녕하세요! 저는 안녕맨입니다. <br />
                  여러분의 경매 예측을 도와드릴 히어로죠!
                  <br />
                  경매 결과를 미리 예측하고 최고의 전략을 세우도록 도와드릴게요.{" "}
                  <br />
                  어떤 경매든 저에게 맡겨주세요!
                  <br /> Let's get started!
                </div>
              </div>
              {userChats.map((c, i) => (
                <div className="chat chat-end">
                  <div className="chat-bubble">{c}</div>
                </div>
              ))}
            </div>
          </div>
          <Button onClick={onClick()} text={"다음 가격 예측하기"} />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
