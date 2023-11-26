import { IoMdCheckboxOutline } from "react-icons/io"
import { Link } from 'react-router-dom';

const HowItWorks = () => {
    return (
        <div>
             <div className="mt-32 ">
        <div className="hero-content w-full flex-col lg:flex-row gap-8 justify-start">
          <div className='lg:w-1/2'>
          <img src="https://i.ibb.co/SKphgPJ/Customer-Survey-color-800px.png" className=" rounded-lg shadow-2xl" />
          </div>
          <div>
            <h1 className="text-6xl text-[#61B15A] font-bold">How It Works</h1>
            <div className="py-6 text-[#61B15A] flex gap-2 items-center font-semibold text-3xl text-dark">
            <IoMdCheckboxOutline></IoMdCheckboxOutline>
             <p>Vote on a survey</p>  </div>
            <div className="py-6 flex gap-2 text-[#61B15A] items-center font-semibold text-3xl text-dark">
                <IoMdCheckboxOutline></IoMdCheckboxOutline>
                <p>See The Survey Results</p></div>
            <div className="py-6 text-[#61B15A] flex gap-2 items-center font-semibold text-3xl text-dark">
            <IoMdCheckboxOutline></IoMdCheckboxOutline>
                <p>Become a pro-user and comment on a survey</p></div>
            <div className="py-6 text-[#61B15A] flex gap-2 items-center font-semibold text-3xl text-dark">
            <IoMdCheckboxOutline></IoMdCheckboxOutline>
                <p>Report Inappropriate content</p></div>
            <div className="py-6 flex gap-2 items-center font-semibold text-3xl text-dark">
            
             
            <Link to='/login'><button className="btn btn-outline text-[#61B15A]">Get Started</button></Link>
          </div>
        </div>
      </div>
        </div>
        </div>
    );
};

export default HowItWorks;