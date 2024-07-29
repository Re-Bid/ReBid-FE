import logo from "../asset/logo.png";

export default function Navigation() {
  return (
    <div className="flex flex-col">
      <div className="flex gap-10 w-[50%] self-end justify-end pt-3 text-sm *:nav">
        <div>회원가입</div>
        <div>로그인</div>
        <div>찜한 상품</div>
        <div>마이페이지</div>
        <div>판매하기</div>
      </div>

      <div className="flex items-center gap-10">
        <div className="flex justify-between items-center">
          <img src={logo} alt="logo" className="size-16" />
          <div className="text-[40px]">Re:Bid</div>
        </div>

        <div className="flex items-center gap-5 *:nav">
          <div className="font-bold">전체</div>
          <div>가방</div>
          <div>키링</div>
          <div>파우치</div>
          <div>지갑</div>
          <div>etc</div>
        </div>
      </div>
    </div>
  );
}
