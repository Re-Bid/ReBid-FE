import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../Button';
import { useNavigate } from 'react-router-dom';

const DetailAdminDeny = () => {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const onValid = (data) => {
        console.log(data)
        alert("반려되었습니다")
        navigate("/admin/list")
    }
    return (
        <form onSubmit={handleSubmit(onValid)} className='space-y-4'>
            <textarea {...register("denyReason")} className='w-full bg-bgColor textarea h-40 ' placeholder='반려 사유를 입력해주세요' />
            <Button text="반려 확정" />
        </form>
    );
};

export default DetailAdminDeny;