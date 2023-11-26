import React from 'react';
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa"

const Testimonials = () => {
    return (
        <div className="my-24 ">
        <h1 className="text-6xl pb-4 font-semibold text-[#61B15A] border-b border-[#61B15A] text-center mb-12">Testimonials</h1>
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-12 px-8 ">
        <div className="bg-[#AFDBF5] p-8 shadow-2xl">
            <div className="relative">
                
            <img className="w-20 border-white border-4 rounded-full absolute  -top-24 left-32" src="https://i.ibb.co/NnXsJxm/member4.png" alt="" />
            <p className='mt-8'><FaQuoteLeft className='text-[#61B15A]'></FaQuoteLeft>I can't express how pleased I am with this survey website. The interface is incredibly user-friendly, making the entire survey-taking experience a breeze. The range of surveys is impressive, covering a variety of topics, ensuring there's always something interesting to participate in. What sets this platform apart is its exceptional rewards system. it's not only generous but also easy to redeem. I've earned some fantastic rewards, and I genuinely look forward to participating in more surveys. Highly recommended!<FaQuoteRight className='text-[#61B15A]'></FaQuoteRight></p>
            <h1 className="text-end text-[#61B15A] font-semibold">-Jenny Kim</h1>
            </div>
           
        </div>
        <div className="bg-[#AFDBF5] p-8 shadow-2xl ">
        <div className="relative">
        <img className="w-20  border-white border-4 rounded-full absolute -top-24 left-32" src="https://i.ibb.co/V963DpP/member3.png" alt="" />
            <p className='mt-8'><FaQuoteLeft className='text-[#61B15A]'></FaQuoteLeft>
            This survey website is hands down one of the best I've used. The design is sleek and intuitive, making it easy to navigate and complete surveys efficiently. The survey options are diverse and engaging, catering to a wide range of interests. What I appreciate the most is the timely and hassle-free reward system. I've received gift cards promptly, and the whole process has been seamless. If you're looking for a reliable and rewarding survey platform, look no further – this one is a gem!
            <FaQuoteRight className='text-[#61B15A]'></FaQuoteRight>
            </p>
            <h1 className="text-end text-[#61B15A] font-semibold">-John Cooper</h1>
        </div>
        </div>
        <div className="bg-[#AFDBF5] p-8 shadow-2xl">
        <div className="relative">
        <img className="w-20  border-white border-4 rounded-full absolute -top-24 left-32" src="https://i.ibb.co/V963DpP/member3.png" alt="" />
            <p className='mt-8'>
            <FaQuoteLeft className='text-[#61B15A]'></FaQuoteLeft>
            I've been using this survey website for a while now, and it continues to impress me. The surveys are not only interesting but also relevant, and the website constantly updates with new opportunities. The user interface is straightforward, making it easy for anyone to participate, regardless of their tech-savviness. The rewards system is generous, and the variety of redemption options is a nice touch. Overall, this survey platform has exceeded my expectations, and I wholeheartedly recommend it to anyone looking to earn rewards through online surveys.
            <FaQuoteRight className='text-[#61B15A]'></FaQuoteRight>
            </p>
            <h1 className="text-end text-[#61B15A] font-semibold">-Jackson Wang</h1>
        </div>
        </div>
       
    </div>
    </div>
    );
};

export default Testimonials;