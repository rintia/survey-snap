
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import SurveyCard from "../AllSurveys/SurveyCard";
import moment from "moment/moment";


const Latest = () => {
    const axiosPublic = useAxiosPublic();
    const { data: surveys = [], refetch } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosPublic.get('/surveys');
            return res.data; 
        }
    });

    const compareTimestamps = (a, b) => {
        // Check if both objects have the timestamp property
        if (a.timestamp && b.timestamp) {
          return moment(b.timestamp).diff(moment(a.timestamp));
        } else if (a.timestamp) {
          return -1; // Object 'a' has a timestamp, so it comes first
        } else if (b.timestamp) {
          return 1;  // Object 'b' has a timestamp, so it comes first
        } else {
          return 0;  // Both objects lack a timestamp, no preference in order
        }
      };

    const sortedSurveyData = surveys.sort(compareTimestamps);
    const latestSurveys = sortedSurveyData.slice(0,6)

        return (
        <div className="mt-32">
             <h1 className="text-6xl text-[#61B15A] font-bold mb-8 text-center">Latest Surveys</h1>
             <div className='my-12 px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    latestSurveys.map(survey => <SurveyCard key={survey._id} survey={survey}></SurveyCard>)
                }
            </div>
        </div>
    );
};

export default Latest;