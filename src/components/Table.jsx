
import React from "react";

const Table = ({ rows, list }) => {
  return (
    <div className="overflow-x-auto ">
      <table className="table">
        <tr className="border-b border-borderColor text-borderColor">
          {rows.map((row, index) => (
            <th key={index}>{row}</th>
          ))}
        </tr>
        <tbody className="">
          {list.map((item, index) => (
            <tr
              key={index}
              className={`${
                index === list.length - 1 ? "" : "border-b border-borderColor "
              }`}
            >
              <th className="">
                <img
                  src={item.imgUrl}
                  className="bg-bgColor w-24 h-24 rounded-lg"
                />
              </th>
              <th>{item.productName}</th>
              {item.time ? <th>{item.time}</th> : null}
              {item.startPrice ? <th>{item.startPrice}</th> : null}
              <th
                className={`${
                  item.status === "승인 거부" ? "text-warningColor" : ""
                }`}
                onClick={() => document.getElementById("승인거부").showModal()}
              >
                {item.status}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
