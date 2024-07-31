import React from "react";
import { useNavigate } from "react-router-dom";
import { BID_STATUS } from "./BidType";

const Table = ({ rows, list, isAdmin }) => {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto ">
      <table className="table">
        <tr className="border-b border-borderColor text-borderColor">
          {list.length === 0
            ? null
            : rows.map((row, index) => <th key={index}>{row}</th>)}
        </tr>
        <tbody className="">
          {list.map((item, index) => (
            <tr
              key={index}
              className={`${
                index === list.length - 1 ? "" : "border-b border-borderColor "
              }`}
              onClick={() => {
                if (
                  item.status !== BID_STATUS.REJECT_CONFIRM ||
                  item.completeStatus !== BID_STATUS.REJECT_CONFIRM
                ) {
                  if (isAdmin) {
                    navigate(`/admin/list/${item.bidId}`);
                  } else {
                    navigate(`/detail/${item.bidId}`);
                  }
                }
              }}
            >
              <th className="">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/${item.imageUrl}`}
                  className="bg-bgColor w-24 h-24 rounded-lg"
                />
              </th>
              <th>{item.itemName}</th>
              {item.time ? <th>{item.time}</th> : null}
              {item.startPrice || item.bidPrice ? (
                <th>{item.startPrice}</th>
              ) : (
                <th>-</th>
              )}
              <th
                className={`${
                  item.status === BID_STATUS.REJECT_CONFIRM ||
                  item.completeStatus === BID_STATUS.REJECT_CONFIRM
                    ? "text-warningColor"
                    : "text-black"
                }`}
              >
                {item.bidStatus || item.completeStatus}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
