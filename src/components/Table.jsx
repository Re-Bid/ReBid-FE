
import React from "react";
import { useNavigate } from "react-router-dom";
import { BID_STATUS } from "./BidType";

const Table = ({ rows, list }) => {
  const navigate = useNavigate()
  return (
    <div className="overflow-x-auto ">
      <table className="table">
        <tr className="border-b border-borderColor text-borderColor">
          {list.length === 0 ? null : rows.map((row, index) => (
            <th key={index}>{row}</th>
          ))}
        </tr>
        <tbody className="">
          {list.map((item, index) => (
            <tr
              key={index}
              className={`${index === list.length - 1 ? "" : "border-b border-borderColor "
                }`}
              onClick={() => {
                if (item.status !== BID_STATUS.REJECT_CONFIRM) {
                  navigate(`${item.id}`)
                }

              }
              }
            >
              <th className="">
                <img
                  src={item.imageUrl}
                  className="bg-bgColor w-24 h-24 rounded-lg"
                />
              </th>
              <th>{item.itemName}</th>
              {item.bidTime ? <th>{item.time}</th> : null}
              {item.bidPrice ? <th>{item.startPrice}</th> : null}
              <th
                className={`${item.status === BID_STATUS.REJECT_CONFIRM ? "text-warningColor" : ""
                  }`}
                onClick={() => document.getElementById("승인거부").showModal()}
              >
                {item.bidStatus}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
