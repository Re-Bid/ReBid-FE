import React, { useState } from 'react';
import himan from "../asset/himan.png"
import { useForm } from 'react-hook-form';

const ChatBot = () => {
    const { register, handleSubmit, reset } = useForm()
    const [userChats, setUserChats] = useState([])

    const onValid = (data) => {
        console.log(data)
        setUserChats(prev => [...prev, data.chat])
        reset()
    }
    return (
        <div className='fixed bottom-4 right-20 z-20'>
            <div className="dropdown dropdown-top dropdown-end">


                <img src={himan} tabIndex={0} role="button" className="btn-lg rounded-full px-2 py-2 m-1 shadow-lg w-20 h-20" />
                <div tabIndex={0} className="dropdown-content menu  rounded-box z-[1] w-[320px] p-4 h-[600px] shadow-lg border flex flex-col bg-white">
                    <div className=' flex-1'>
                        <div className='h-[500px] overflow-y-scroll'>
                            <div className="chat chat-start items-end">
                                <img src={himan} className='h-10 w-10 rounded-full border' />
                                <div className="chat-bubble">
                                    안녕~ 나는 안녕맨이야!
                                </div>
                            </div>
                            {userChats.map((c, i) =>
                                <div className="chat chat-end">
                                    <div className="chat-bubble">
                                        {c}</div>
                                </div>)}
                        </div>


                    </div>
                    <form onSubmit={handleSubmit(onValid)} className=''>
                        <input className='inputText' {...register("chat")} />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;