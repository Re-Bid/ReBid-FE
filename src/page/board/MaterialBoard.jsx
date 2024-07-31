import React, { useEffect, useState } from "react";
import { formatDateTime } from "../../components/detailcompos/DetailContainer";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import axios from "axios";
import { useCookies } from "react-cookie";

const MaterialBoard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/material`)
      .then((r) => {
        console.log(r);
        setData(r.data.data.materials);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="">
        <div className="py-4 space-y-3">
          <div className="flex justify-between items-center text-xl">
            <p>재료 게시판</p>
            <div onClick={() => navigate("/materialboard/upload")}>
              <Button text="게시글 등록하기" />
            </div>
          </div>
          <p className="text-xs">
            이곳에서는 재활용 가능한 자원, 사용하지 않는 물건, 그리고 업사이클링
            프로젝트에 적합한 재료들을 손쉽게 찾고, 사고, 팔 수 있습니다.
          </p>
        </div>
        <div className="overflow-x-auto pb-10">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th className="w-3/5">글제목</th>
                <th>작성자</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr onClick={() => navigate(`${index + 1}`)} key={index}>
                  <th>{index + 1}</th>
                  <td>{`${item.title}`}</td>
                  <td>{item.nickname}</td>
                  <td>{item.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MaterialBoard;
