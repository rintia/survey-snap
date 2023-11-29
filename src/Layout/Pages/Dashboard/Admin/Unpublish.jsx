import React from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import UnpublishCard from './UnpublishCard';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const Unpublish = () => {
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
        <div>
            <div className='my-12 px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    surveys.map(survey => <UnpublishCard key={survey._id} survey={survey}></UnpublishCard>)
                }
            </div>
        </div>
    );
};

export default Unpublish;