import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SurveyCard from "../AllSurveys/SurveyCard";


const Featured = () => {
    const axiosPublic = useAxiosPublic();
    const { data: surveys = [], refetch } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosPublic.get('/surveys');
            return res.data;  
        }
    });
    const sorted = [...surveys].sort((a, b) => {
        const totalVotedA = a?.totalVoted || 0; 
    const totalVotedB = b?.totalVoted || 0; 
    console.log(totalVotedA);

    return totalVotedB - totalVotedA;
    });
    const featured = sorted.slice(0,6)

    return (
        <div className="mt-28">
            <h1 className="text-6xl text-[#61B15A] font-bold mb-8 text-center">Featured Surveys</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                featured.map(survey => <SurveyCard key={survey._id} survey={survey}></SurveyCard>)
            }
        </div>
        </div>
    );
};

export default Featured;