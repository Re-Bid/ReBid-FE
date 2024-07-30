import React from 'react';
import { useParams } from 'react-router-dom';
import { formatDateTime } from '../../components/detailcompos/DetailContainer';
import { useForm } from 'react-hook-form';

const comments = [
    {
        imgUrl: "",
        nickName: "주희",
        content: "저 사고 싶어요",
        date: "2024-08-04T03:14"
    },
    {
        imgUrl: "",
        nickName: "주희",
        content: "저 사고 싶어요",
        date: "2024-08-04T03:14"
    },
    {
        imgUrl: "",
        nickName: "주희",
        content: "저 사고 싶어요",
        date: "2024-08-04T03:14"
    }
]

const MaterialBoardDetail = () => {
    const { id } = useParams()
    const { register, handleSubmit } = useForm()

    const onValid = (data) => {
        console.log(data)
    }
    return (
        <div className='py-4 px-10'>
            <div className='border-b border-borderColor'>
                <p className='font-bold text-3xl'>골판지 10장 팔아요</p>
                <div className='flex justify-between items-end p-3 py-5'>
                    <div className='flex items-center space-x-4'>
                        <img className='h-14 w-14 bg-bgColor rounded-full' />
                        <div>
                            <p className='font-bold'>융짜니</p>
                            <p>날짜</p>
                        </div>
                    </div>
                    <div>
                        댓글 3개
                    </div>
                </div>
            </div>
            <div className='py-10 border-b border-borderColor'>
                <p className='mx-10'>
                    집에 병뚜껑 왕 많아요!! 사실 분?
                </p>
            </div>
            <div className='py-4'>
                <div className='mx-10'>
                    {comments.map((c, index) => (
                        <div className='flex space-x-4 py-4'>
                            <img src={c.imgUrl} className='h-14 w-14 rounded-full bg-bgColor' />
                            <div>
                                <p className='font-bold'>{c.nickName}</p>
                                <p className='pt-4 pb-2'>{c.content}</p>
                                <p className='text-borderColor font-thin' >{formatDateTime(c.date)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <form onSubmit={handleSubmit(onValid)} className='mb-10 relative  rounded-lg group-hover textarea textarea-bordered '>
                <p className='absolute pt-1 left-4 font-bold'>찐주희</p>
                <textarea {...register("comment")} className='mt-10 focus:outline-none w-full ' />
                <button className='absolute bottom-0 right-3 font-bold text-borderColor'>등록</button>
            </form>
        </div>
    );
};

export default MaterialBoardDetail;