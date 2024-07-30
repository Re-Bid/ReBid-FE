import { useForm } from "react-hook-form";
import Logo from "../../asset/logo.png"
import Button from "../../components/Button"
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { register, handleSubmit } = useForm()
  const naviagtion = useNavigate()

  const onValid = (data) => {
    if (data.code = "1234") {
      naviagtion("/admin/list")
    }
  }
  return (
    <div className="flex flex-col justify-center items-center space-y-10 mt-40">
      <div className="flex flex-col items-center">
        <img src={Logo} className="w-80 bg-cover" />
        <div className="font-gmarket text-6xl">Re:Bid</div>
      </div>
      <form onSubmit={handleSubmit(onValid)} className="w-full flex justify-center">
        <input className="inputText w-80 " placeholder="관리자코드를 입력해주세요" {...register("code")} />




      </form>


    </div>);
}
