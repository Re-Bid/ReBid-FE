import React from 'react';
import Button from './Button';

const ItemDetailModal = ({ title, child, buttonText }) => {

    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className=" text-lg border-b py-4 border-borderColor">{title}</h3>
                <div className="py-4">{child}</div>
            </div>
        </dialog>
    );
};

export default ItemDetailModal;