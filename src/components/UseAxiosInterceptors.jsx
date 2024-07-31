import axios from "axios";
import { useCookies } from "react-cookie";
import React, { Fragment, useEffect } from "react";

// 토큰이 필요한 요청을 위한 axios 인스턴스
const authAxios = axios.create();

// 토큰이 필요하지 않은 요청을 위한 axios 인스턴스
const noAuthAxios = axios.create();

const UseAxiosInterceptors = () => {
  const [cookies, setCookie] = useCookies(["accessToken", "loginStatus"]);

  useEffect(() => {
    // 요청 인터셉터 설정 (authAxios 인스턴스에만 적용)
    const requestInterceptor = authAxios.interceptors.request.use(
      (config) => {
        const token = cookies.accessToken;
        if (token) {
          config.headers[
            "Authorization"
          ] = `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6NywiaWF0IjoxNzIyNDQ2NTgyLCJleHAiOjE3MjI0NjQ1ODJ9.7OXdUqGJ6AKcXfNQp2B2h0KCR_JhUA3HfL45wmf-PGk"}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 응답 인터셉터 설정 (authAxios 인스턴스에만 적용)
    const responseInterceptor = authAxios.interceptors.response.use(
      (response) => {
        // 응답이 성공적으로 왔을 때 loginStatus를 true로 설정
        // setCookie('loginStatus', true, { path: '/', maxAge: 3600 }); // 1시간 유효
        return response;
      },
      (error) => {
        // 응답이 실패했을 때 loginStatus를 false로 설정
        // setCookie('loginStatus', false, { path: '/', maxAge: 3600 }); // 1시간 유효
        if (error.response && error.response.status === 401) {
          // 토큰 만료 등 인증 오류 처리
          console.error("Token expired or not valid.");
          // 추가적인 에러 처리 로직을 여기에 작성
          // 예를 들어, 로그아웃 처리 또는 토큰 갱신 요청
        }
        return Promise.reject(error);
      }
    );

    // 컴포넌트 언마운트 시 인터셉터 제거
    return () => {
      authAxios.interceptors.request.eject(requestInterceptor);
      authAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [cookies, setCookie]);

  return <Fragment />;
};

export { authAxios, noAuthAxios };
export default UseAxiosInterceptors;
