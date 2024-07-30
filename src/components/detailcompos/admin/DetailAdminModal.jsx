import React from 'react';
import DetailAdminDeny from './DetailAdminDeny';
import DetailAdminApprove from './DetailAdminApprove';

const DetailAdminModal = ({ id, title, bidId }) => {
    return (
        <dialog id={id} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className=" text-lg py-4">{title}</h3>
                <div className="py-4">{id === "deny" ? <DetailAdminDeny bidId={bidId} /> : <DetailAdminApprove bidId={bidId} />}</div>
            </div>
        </dialog>
    );
};

export default DetailAdminModal;