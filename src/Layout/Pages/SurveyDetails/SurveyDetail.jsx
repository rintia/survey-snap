import { useEffect, useState } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai"
import { MdOutlineReport } from "react-icons/md";
import { useLoaderData } from 'react-router-dom';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const SurveyDetail = () => {
    const [totalVoted, setTotalVoted] = useState(0);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [yesVoted, setYesVoted] = useState(0);
    const [noVoted, setNoVoted] = useState(0);
    const survey = useLoaderData();
    const axiosPublic = useAxiosPublic()
    
    const { _id, title, category, description, question } = survey;
    
    
   
    
    useEffect(() => {
        // Fetch existing survey data from the backend when the component mounts
        const fetchSurveyData = async () => {
            try {
                const response = await axiosPublic.get(`surveys/${_id}`);
                const surveys = response.data;
                setTotalVoted(surveys.totalVoted || 0);
                setYesVoted(surveys.yesVoted || 0);
                setNoVoted(surveys.noVoted || 0);
                setLikes(surveys.likes || 0);
                setDislikes(surveys.dislikes || 0);
            } catch (error) {
                console.error('Error fetching survey data:', error.message);
            }
        };

        fetchSurveyData();
    }, [_id]);
    
    const handleYesVote = async() => {
        console.log('yess');
        setTotalVoted(totalVoted + 1);
        setYesVoted(yesVoted + 1);
        console.log(totalVoted);
        try {
            await axiosPublic.patch(`surveys/${_id}`, {
                totalVoted: totalVoted + 1,
                yesVoted: yesVoted + 1,
                noVoted: noVoted,
                likes: likes,
                dislikes: dislikes,
            });
        } catch (error) {
            console.error('Error updating survey data:', error.message);
        }
    }
    // const handleNoVote = () => {
      
    // }
    // const handleLikes = () => {
      
    // }
    // const handleDislikes = () => {
      
    // }

    return (
        <div>

            <div className='mt-12 border-2 p-4'>
                <div className="flex justify-end">
                    <button className="text-red-500 btn btn-outline">Report<MdOutlineReport className="text-2xl"></MdOutlineReport></button>
                </div>
                <div className='text-center  space-y-4'>
                    <h1 className='text-xl md:text-2xl lg:text-4xl text-[#61B15A]'>{title}</h1>
                    <p><span className='font-semibold'>Category: </span>{category}</p>
                    <p className='text-sm'>{description}</p>
                    <h1 className='text-2xl md:text-3xl lg:text-5xl '>Q: {question}</h1>
                </div>
                <div className='space-y-6 mt-12 flex flex-col justify-center text-white'>
                    <button onClick={handleYesVote} className="btn w-full h-16 text-3xl text-white hover:text-black bg-[#61B15A]">YES</button>
                    <button  className="btn w-full text-3xl h-16 text-white hover:text-black bg-[#0066b2]">NO</button>
                </div>
            </div>
            <div className='mt-4 flex justify-between'>
                <div className='flex gap-6'>
                    <div className="flex gap-2">
                        <button><AiOutlineLike className="text-2xl"></AiOutlineLike></button>
                        <h1 >0 likes</h1>
                    </div>
                    <div className="flex gap-2">
                        <button ><AiOutlineDislike className="text-2xl"></AiOutlineDislike></button>
                        <h1>0 dislikes</h1>
                    </div>
                </div>
                <h1>Total Voted:{survey.totalVoted}</h1>
            </div>
        </div>
    );
};

export default SurveyDetail;