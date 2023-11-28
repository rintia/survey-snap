import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import SurveyCard from '../AllSurveys/SurveyCard';
import UpdateCard from './UpdateCard';

const UpdateSurvey = () => {
    const axiosPublic = useAxiosPublic();
    const { data: surveys = [], refetch } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosPublic.get('/surveys');
            return res.data;
            
        }
    });
    return (
        <div>
             <div className='my-12 px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    surveys.map(survey => <UpdateCard key={survey._id} survey={survey}></UpdateCard>)
                }
            </div>
        </div>
    );
};

export default UpdateSurvey;