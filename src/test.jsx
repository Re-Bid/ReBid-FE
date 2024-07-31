// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import { authAxios, noAuthAxios } from "./components/UseAxiosInterceptors";
import { useCookies } from "react-cookie";

// const formData = new FormData();
//   // 폼에 데이터를 첨부하기 위해서는 form.append('키값(필드)', 데이터) 를 이용한다.
//   // 폼에 파일 첨부. 파일 첨부 같은 경우에는 반복문을 통해 append 해주어야 한다.

//   formData.append("image", data.target.files[0]);
//   // 폼에 텍스트 정보 첨부.
//   // 텍스트 그대로 전송되기 때문에, Object를 보내기 위해서는 JSON 형식으로 보낸다.

//   try {
//     // axios를 이용한 post 요청. 헤더를 multipart/form-data 로 한다.
//     await axios.post(`${process.env.REACT_APP_BASE_URL}`, formData, {
//       headers: { "Content-Type": "multipart/form-data", charset: "utf-8" },
//     });
//     alert("게시글이 등록되었습니다");
//   } catch (err) {
//     console.log(err);
//   }

export default () => {
  const [cookie] = useCookies()

  const onClick = () => {
    // axios({
    //   method: 'get',
    //   url: `${process.env.REACT_APP_BASE_URL}/bids/1/heart`,
    //   headers: {
    //     Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiYXV0aG9yaXRpZXNLZXkiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiZXhwIjoxNzIyNDUyNDA5LCJpYXQiOjE3MjI0MzQ0MDl9.rtP8bL2fULrK1UZ8GHReTBtQVWzH44TmmsxUvbiOCaI"}`
    //   }
    // }).then(res => console.log(res)).catch(err => console.log(err))
    noAuthAxios.get(`${process.env.REACT_APP_BASE_URL}/bids`).then(res => console.log(res)).catch(err => console.log(err))

  }

  return (
    <div>
      <button onClick={onClick} >버튼</button>
    </div>
  );
};
