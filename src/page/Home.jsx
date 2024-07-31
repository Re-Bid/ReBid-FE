import { useEffect, useRef, useState } from "react";
import Banner from "../components/home/Banner";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "../style/swiper.css";
import "swiper/css/pagination";
import { useCookies } from "react-cookie";
import { authAxios, noAuthAxios } from "../components/UseAxiosInterceptors"
import home3 from "../asset/home3.png";
import home4 from "../asset/home4.jpg";


export default function Home() {
  const [aniOne, setAniOne] = useState(false);
  const [aniTwo, setAniTwo] = useState(false);
  const [aniThree, setAniThree] = useState(false);
  const trigger1 = useRef(null);
  const trigger2 = useRef(null);
  const trigger3 = useRef(null);

  useEffect(() => {
    noAuthAxios
      .get(`${process.env.REACT_APP_BASE_URL}/bids`)
      .then((res) => {
        setData(res.data.data.bids);
        return res.data.data.bids[0];
      })
      .catch((e) => console.log(e));

    // axios
    //   .get(`${process.env.REACT_APP_BASE_URL}/bids/imminent`)
    //   .then((res) => {
    //     setEndTod(res.data.data.bids);
    //   })
    //   .catch((e) => console.log(e));

  }, [cookie]);
    const observer1 = new IntersectionObserver((entries) => {
      const element = entries[0];
      if (element.isIntersecting && trigger1.current) {
        setAniOne(true);
      } else {
        setAniOne(false);
      }
    });
    const observer2 = new IntersectionObserver((entries) => {
      const element = entries[0];
      if (element.isIntersecting && trigger1.current) {
        setAniTwo(true);
      } else {
        setAniTwo(false);
      }
    });
    const observer3 = new IntersectionObserver((entries) => {
      const element = entries[0];
      if (element.isIntersecting && trigger1.current) {
        setAniThree(true);
      }
    });
    if (trigger1.current) {
      observer1.observe(trigger1.current);
    }
    if (trigger2.current) {
      observer2.observe(trigger2.current);
    }
    if (trigger3.current) {
      observer3.observe(trigger3.current);
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-52 py-10">
      <Banner />

      <div className="flex justify-center gap-5 py-10 w-full items-center">
        <div className="w-[600px] font-thin flex-col flex gap-4 *:text-center items-center justify-center animate-fromBottom">
          <div className="flex gap-5 items-center justify-center">
            <FaQuoteLeft className="size-16 opacity-30" />
            <div className="text-2xl">
              <strong>쓰레기</strong>를 사고 팔 수 없을까?
            </div>
            <FaQuoteRight className="size-16 opacity-30" />
          </div>
          <div>
            막연한 생각에서 시작한 서비스인{" "}
            <span className="font-normal text-xl">Re:Bid</span>는
          </div>
          <div className="">
            기존의 물품에 새로운 의미를 부여하는 업사이클링의 활성화를 통해{" "}
            <br /> 소비자에게{" "}
            <span className="font-semibold italic">
              세상에 유일한 제품 소비
            </span>
            와{" "}
            <span className="font-semibold italic">
              환경 보호 및 지속 가능한 소비
            </span>
            라는 <br />
            두개의 가치를 제공합니다.
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-5 py-10 w-full items-center">
        <span ref={trigger1} />

        <div
          className={`w-[600px] font-thin flex-col flex gap-4 *:text-center items-center justify-center ${
            aniOne
              ? "animate-fromBottom"
              : "transition duration-500 opacity-0 -translate-y-10"
          }`}
        >
          <div className="flex gap-5 items-center justify-center">
            <FaQuoteLeft className="size-16 opacity-30" />
            <div className="text-2xl">
              제품의 가치를 정하기 위한 <strong>경매</strong> 형식의 거래
            </div>
            <FaQuoteRight className="size-16 opacity-30" />
          </div>
          <div>
            가격을 정하기 힘든 업사이클링 제품의 특성을 보완하기 위해 경매라는
            시스템을 이용합니다.
            <br />
            가장 높은 가치를 부여한 고객에게 제품을 제공함으로써,
            <br />
            <span className="italic font-semibold">
              창작자의 노고와 작품의 가치를 존중합니다.
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-5 py-10 w-full items-center">
        <span ref={trigger2} />

        <div
          className={`w-[600px] font-thin flex-col flex gap-4 *:text-center items-center justify-center ${
            aniTwo
              ? "animate-fromBottom"
              : "transition duration-500 opacity-0 -translate-y-10"
          }`}
        >
          <div className="flex gap-5 items-center justify-center">
            <FaQuoteLeft className="size-16 opacity-30" />
            <div className="text-2xl">
              누군가에겐 <strong>쓰레기</strong>, <br />
              누군가에겐 귀한 <strong>재료</strong>
            </div>
            <FaQuoteRight className="size-16 opacity-30" />
          </div>
          <div>
            망가진 가방이나 낡아서 입지 못하는 옷들이 <br /> 누군가에게는
            재생산을 위한 중요한 재료가 될 수 있습니다. <br />
            이러한 아이러니를 이용하여 업사이클링 재료를 사고 팔 수 있는
            플랫폼을 제공,
            <br />
            <span className="italic font-semibold">
              '쓰레기를 사고 파는'
            </span>{" "}
            것을 현실화 했습니다.
          </div>
        </div>
      </div>

      <span ref={trigger3} />
      <div
        className={`w-full h-[600px] grid grid-cols-2 overflow-hidden mb-20 ${
          aniThree
            ? "animate-fromBottom"
            : "transition duration-500 opacity-0 -translate-y-10"
        }`}
      >
        <div className="w-full h-full overflow-hidden cursor-default">
          <div className="bg-cover w-full h-full group  relative z-0">
            <div
              className="w-full absolute h-[600px] group-hover:scale-110 transition group-hover:duration-[8s]  bg-center bg-cover z-10"
              style={{
                backgroundImage: `url(${home3})`,
              }}
            />
            <div className="w-full h-[600px] bg-black/50 flex flex-col items-center justify-center gap-10 text-white px-5 relative z-20">
              <div className="text-[500px] font-bold absolute z-30 -bottom-[250px] opacity-50">
                Re
              </div>
              <div className="font-thin relative bottom-10">
                쓰레기에 새로운 가치를 부여하는 업사이클링을 <br /> 활성화하고자
                하는 의미를 담기 위해, <br /> '다시', '재차'를 의미하는 영어
                접두사 'Re'를 활용하였습니다.
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full overflow-hidden">
          <div className="bg-cover w-full h-full group cursor-default relative z-0">
            <div
              className="w-full absolute h-[600px] group-hover:scale-110 transition group-hover:duration-[8s]  bg-center bg-cover z-10"
              style={{
                backgroundImage: `url(${home4})`,
              }}
            />
            <div className="w-full h-[600px] bg-black/50 flex flex-col items-center justify-center gap-10 text-white px-5 relative z-20">
              <div className="text-[355px] font-bold absolute z-30 -top-[170px] opacity-50">
                Bid
              </div>
              <div className="font-thin relative top-16">
                업사이클링 제품의 적절한 가격에 대한 회적 합의가 이루어지지
                않아, <br /> 그동안 업사이클링 제품 시장이 활성화되지
                않았습니다. <br /> <br /> 이러한 이유로, <br />
                우리는 경매라는 거래 방식을 도입하여 시장을 확장하고자 합니다.
                따라서 경매를 의미하는 영어 단어 'Bid'를 선택했습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
