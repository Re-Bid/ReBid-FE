import React from "react";

const DetailModal = ({ id, title, child }) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className=" text-lg border-b py-4 border-borderColor">{title}</h3>
        <div className="py-4">{child}</div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default DetailModal;
