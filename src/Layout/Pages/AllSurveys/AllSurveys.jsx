import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const AllSurveys = () => {
    const axiosPublic = useAxiosPublic();
    const { data: surveys = [], refetch } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosPublic.get('/surveys');
            return res.data;
        }
    })
    console.log(surveys);
    return (
        <div>
            <h1>All Surveys: {surveys.length}</h1>
        </div>
    );
};

export default AllSurveys;