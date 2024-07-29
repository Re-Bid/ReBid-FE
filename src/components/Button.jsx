export default function Button({ text, isGray }) {
  return (
    <div
      className={`btn  ${
        isGray ? "bg-neutral-400 text-warningColor" : "bg-black text-white"
      }`}
    >
      {text}
    </div>
  );
}
