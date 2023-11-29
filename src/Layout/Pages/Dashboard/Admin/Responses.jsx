import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import ResponseCard from "./ResponseCard";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const Responses = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { data: surveys = [], refetch } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosSecure.get('/surveys');
            return res.data;
        }
    });
    return (
        <div className='my-12 px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    surveys.map(survey => <ResponseCard key={survey._id} survey={survey}></ResponseCard>)
                }
            </div>
    );
};

export default Responses;