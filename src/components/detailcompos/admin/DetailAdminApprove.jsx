import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../Button';

const DetailAdminApprove = ({ bidType }) => {
    const { register, handleSubmit } = useForm()

    const onValid = () => {

    }
    return (
        <form onSubmit={handleSubmit(onValid)} className='flex flex-col space-y-4'>
            <div className='flex items-center flex-nowrap'>
                <p className=''>
                    입찰 시작 날짜
                </p>
                <input {...register("startDate")} type='date' className='border border-borderColor p-1 rounded-lg placeholder:text-borderColor w-full' />
            </div>
            {bidType === "기간 경매" ?
                <div>
                    입찰 마감 날짜
                    <input {...register("endDate")} type='date' className='border border-borderColor p-1 rounded-lg placeholder:text-borderColor w-full' />
                </div> : null}

            <Button text={"승인하기"} />
        </form>
    );
};

export default DetailAdminApprove;