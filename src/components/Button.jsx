export default function Button({ text, isGray }) {
  return (
    <div
      className={`btn border-none  ${isGray ? "bg-bgColor text-warningColor" : "bg-black text-white"
        }`}
    >
      {text}
    </div>
  );
}
