export default function Button({ text, isGray }) {
  return (
    <button
      className={`btn w-full border-none  ${isGray ? "bg-bgColor text-warningColor" : "bg-black text-white"
        }`}
    >
      {text}
    </button>
  );
}
