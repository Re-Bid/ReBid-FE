import React from 'react';

const Table = ({ rows, list }) => {
    return (
        <div className="overflow-x-auto ">
            <table className="table">
                <tr className="border-b border-borderColor text-borderColor">
                    {rows.map((row, index) => (
                        <th key={index}>{row}</th>
                    ))}
                </tr>
                <tbody className=''>
                    {list.map((item, index) => (
                        <tr key={index} className={`${index === list.length - 1 ? "" : "border-b border-borderColor"} `}>
                            <th className="">
                                <img src={item.imgUrl} className="bg-bgColor w-24 h-24 rounded-lg" /></th>
                            <th>{item.productName}</th>
                            <th>{item.startPrice}</th>
                            <th>{item.status}</th>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default Table;