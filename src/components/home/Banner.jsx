import home2 from "../../asset/home2.jpg";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-[600px] flex justify-start items-center overflow-hidden bg-cover bg-start"
      style={{
        backgroundImage: `url(${home2})`,
      }}
    >
      <div className="font-thin text-2xl text-white bg-gradient-to-r animate-fadeIn from-black/50 via-black/50 to-black/0 w-full flex items-start justify-center flex-col px-10 h-full">
        <div className="w-full">
          <span className="font-bold text-[40px]">Re:Bid</span>는 이 세상에{" "}
          <strong>하나뿐인</strong> 제품으로 가득합니다.
          <br />
          <br />
          경매에 참여하여 <br /> 자신의 일상을 유일함으로 채워보세요.
        </div>
        <div className="w-[100px] py-3" onClick={() => navigate("/signup")}>
          <button className="btn">시작하기</button>
        </div>
      </div>

      {/* // <div className="h-[450px] grid grid-cols-[1fr_1fr] w-full"> */}
      {/* <div className="h-full text-white bg-[black] opacity-30 px-14 py-10 flex flex-col justify-around font-light">
        <div className="font-bold text-3xl">
          {banner.itemName ? banner.itemName : <div>no Data</div>}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl font-medium">
            {banner.endDate ? (
              formatDateTime(banner.endDate)
            ) : (
              <div>no Data</div>
            )}
            에 경매 마감
          </div>
          <div className="font-thin text-lg">
            {banner.itemIntro ? banner.itemIntro : <div>no Data</div>}
          </div>
          <div className="font-thin text-xs">
            ₩{banner.startPrice ? banner.startPrice : <div>no Data</div>}
            부터~
          </div>
        </div>
      </div>
      {banner?.imageUrls ? (
        <div
          className="bg-neutral-300 bg-center bg-cover"
          style={{
            backgroundImage: `url(${banner?.imageUrls[0]})`,
          }}
        />
      ) : null} */}

      {/* // <div
      //   className="bg-cover bg-center w-full h-full"
      //   style={{
      //     backgroundImage: `url(${himan})`,
      //   }}
      // ></div>
    // </div> */}
    </div>
  );
};

export default Banner;
