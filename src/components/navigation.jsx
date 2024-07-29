import { useNavigate } from "react-router-dom";
import logo from "../asset/logo.png";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [navState, setNavState] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.href.includes("bag")) {
      setNavState("bag");
    } else if (window.location.href.includes("keyring")) {
      setNavState("keyring");
    } else if (window.location.href.includes("pouch")) {
      setNavState("pouch");
    } else if (window.location.href.includes("wallet")) {
      setNavState("wallet");
    } else if (window.location.href.includes("else")) {
      setNavState("else");
    } else {
      setNavState("");
    }
  }, [window.location.href]);

  return (
    <div className="font-notoSans min-w-[1024px] bg-white">
      <div className="flex gap-6 self-end justify-end pt-3 text-sm *:nav">
        <div onClick={() => navigate("/login")}>회원가입</div>
        <div onClick={() => navigate("/login")}>로그인</div>
        <div onClick={() => navigate("/likelists")}>찜한 상품</div>
        <div onClick={() => navigate("/mypage")}>마이페이지</div>
        <div onClick={() => navigate("/sell")}>판매하기</div>
      </div>

      <div className="flex items-center gap-10">
        <div className="flex justify-between items-center">
          <img src={logo} alt="logo" className="size-16" />
          <div className="text-[40px] font-gmarket">Re:Bid</div>
        </div>

        <div className="flex items-center gap-5 *:nav">
          <div
            className={navState === "" ? "font-bold" : "null"}
            onClick={() => navigate("")}
          >
            전체
          </div>
          <div
            className={navState === "bag" ? "font-bold" : "null"}
            onClick={() => navigate("/itemlists/bag")}
          >
            가방
          </div>
          <div
            className={navState === "keyring" ? "font-bold" : "null"}
            onClick={() => navigate("/itemlists/keyring")}
          >
            키링
          </div>
          <div
            className={navState === "pouch" ? "font-bold" : "null"}
            onClick={() => navigate("/itemlists/pouch")}
          >
            파우치
          </div>
          <div
            className={navState === "wallet" ? "font-bold" : "null"}
            onClick={() => navigate("/itemlists/wallet")}
          >
            지갑
          </div>
          <div
            className={navState === "else" ? "font-bold" : "null"}
            onClick={() => navigate("/itemlists/else")}
          >
            etc
          </div>
        </div>
      </div>
    </div>
  );
}
