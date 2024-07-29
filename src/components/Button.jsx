export default function Button({ text, isGray }) {
  return (
    <div
      className={`btn w-full hover:bg-opacity-80 border-none  ${isGray ? "bg-neutral-400 text-warningColor" : "bg-bgColor text-white"
        }`}
    >
      {text}
    </div>
  );
}
