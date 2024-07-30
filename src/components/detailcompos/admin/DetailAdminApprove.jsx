import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DateTimeToString(date, time) {
    // 주어진 날짜와 시간을 하나의 문자열로 결합합니다.
    const dateTimeString = `${date}T${time}:00`;

    // Date 객체를 사용하여 ISO 8601 형식으로 변환합니다.
    const dateTime = new Date(dateTimeString);

    // 변환된 ISO 8601 형식의 문자열을 반환합니다.
    return dateTime.toISOString();
}

const DetailAdminApprove = ({ bidId }) => {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const onValid = (data) => {
        const startDate = DateTimeToString(data.startDate, data.startTime)
        const endDate = DateTimeToString(data.endDate, data.endTime)

        axios.put(`${process.env.REACT_APP_BASE_URL}/admin/bids/${bidId}/confirm/reservation`, {
            startDate: startDate,
            endDate: endDate
        }, {
            headers: {
                'Authorization': `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MSwiaWF0IjoxNzIyMzU4NTAxLCJleHAiOjE3MjIzNzY1MDF9.2KMjJrFfdUpC2xVbfVB4utE6n6mqf8V3cb3aqr5KEnE"}`
            }
        }).then(res => {
            console.log(res)
            alert("승인 되었습니다")
            navigate("/admin/list")
        }).catch(err => console.log(err))
    }

    return (
        <form onSubmit={handleSubmit(onValid)} className='space-y-4 flex flex-col items-center'>
            <div className='flex items-center space-x-4 '>
                <div className=''>
                    입찰 시작 날짜
                </div>
                <div className=' space-x-2'>
                    <input {...register("startDate")} type='date' className='border border-borderColor p-1 rounded-lg placeholder:text-borderColor ' />
                    <input {...register("startTime")} type='time' className='border border-borderColor p-1 rounded-lg placeholder:text-borderColor ' />
                </div>

            </div>
            <div className='flex items-center space-x-4 '>
                <div className=''>
                    입찰 마감 날짜
                </div>
                <div className='space-x-2'>
                    <input {...register("endDate")} type='date' className='border border-borderColor p-1 rounded-lg placeholder:text-borderColor ' />
                    <input {...register("endTime")} type='time' className='border border-borderColor p-1 rounded-lg placeholder:text-borderColor ' />
                </div>

            </div>

            <Button text={"승인하기"} />
        </form>
    );
};

export default DetailAdminApprove;