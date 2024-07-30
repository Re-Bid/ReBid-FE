import React, { useState, useEffect } from 'react';

function TimeCountdown({ date }) {
    const [timeRemaining, setTimeRemaining] = useState('');

    useEffect(() => {
        const targetDate = new Date(date);

        const updateRemainingTime = () => {
            const currentTime = new Date();
            const timeDifference = targetDate - currentTime;

            const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hoursRemaining = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesRemaining = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const secondsRemaining = Math.floor((timeDifference % (1000 * 60)) / 1000);

            setTimeRemaining(`${daysRemaining}일 ${hoursRemaining}시간 ${minutesRemaining}분 ${secondsRemaining}초`);
        };

        updateRemainingTime(); // 초기 시간 설정
        const intervalId = setInterval(updateRemainingTime, 1000);

        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 제거
    }, [date]);

    return (

        <p className='font-bold'>{timeRemaining}</p>
    );
}

export default TimeCountdown;
