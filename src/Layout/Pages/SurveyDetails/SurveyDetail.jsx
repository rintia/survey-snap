import { AiOutlineLike , AiOutlineDislike} from "react-icons/ai"
import { MdOutlineReport } from "react-icons/md";
import { useLoaderData } from 'react-router-dom';

const SurveyDetail = () => {
    const survey = useLoaderData();
    const{_id, title, category, description, question } = survey;
    return (
   <div>
    
     <div className='mt-12 border-2 p-4'>
     <div className="flex justify-end">
    <button className="text-red-500 btn btn-outline">Report<MdOutlineReport className="text-2xl"></MdOutlineReport></button>
    </div>
            <div className='text-center  space-y-4'>
           <h1 className='text-4xl text-[#61B15A]'>{title}</h1>
           <p><span className='font-semibold'>Category: </span>{category}</p>
           <p className='text-sm'>{description}</p>
           <h1 className='text-5xl '>Q: {question}</h1>
           </div>
           <div className='space-y-6 mt-12 flex flex-col justify-center text-white'>
           <button className="btn w-full h-16 text-3xl text-white hover:text-black bg-[#61B15A]">YES</button>
           <button className="btn w-full text-3xl h-16 text-white hover:text-black bg-[#0066b2]">NO</button>
           </div>
    </div>
    <div className='mt-4 flex justify-between'>
    <div className='flex gap-6'>
        <div className="flex gap-2">
        <button><AiOutlineLike className="text-2xl"></AiOutlineLike></button>
        <h1>0 likes</h1>
        </div>
        <div className="flex gap-2">
        <button><AiOutlineDislike className="text-2xl"></AiOutlineDislike></button>
        <h1>0 dislikes</h1>
        </div>
    </div>
    <h1>Total Voted: 0</h1>
</div>
   </div>
    );
};

export default SurveyDetail;